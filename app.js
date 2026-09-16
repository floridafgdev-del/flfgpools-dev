// Entry point for cPanel Node.js hosting (Phusion Passenger).
// Passenger injects the PORT to listen on via the environment.
// The app must be built first with `npm run build` so that `.next`
// exists before this file is executed.

// cPanel "Setup Node.js App" stores env vars in a .env file at the app root.
// Load it before importing anything else so process.env is populated.
import 'dotenv/config';

import next from 'next';
import { execFileSync } from 'node:child_process';
import { createServer } from 'http';

const port = Number(process.env.PORT) || 3010;
const dev = process.env.NODE_ENV !== 'production';
const hostname = process.env.HOSTNAME || '0.0.0.0';
const killExisting = process.env.KILL_EXISTING === 'true';

if (killExisting) {
  try {
    const output = execFileSync(
      'lsof',
      [`-tiTCP:${port}`, '-sTCP:LISTEN', '-n', '-P'],
      { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }
    );
    const pids = output
      .split(/\s+/)
      .filter(Boolean)
      .map(Number)
      .filter((pid) => pid > 0 && pid !== process.pid);

    pids.forEach((pid) => process.kill(pid, 'SIGTERM'));

    if (pids.length > 0) {
      // eslint-disable-next-line no-console
      console.log(`> Stopped ${pids.length} existing process(es) on port ${port}`);
    }
  } catch (error) {
    if (error?.status !== 1) {
      throw error;
    }
  }
}

if (process.argv.includes('--kill-only')) {
  process.exit(0);
}

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = createServer((req, res) => handle(req, res));

    server.listen(port, hostname, () => {
      // eslint-disable-next-line no-console
      console.log(`> Ready on http://${hostname}:${port} (dev=${dev})`);
    });

    // Graceful shutdown so Passenger restarts don't leave dangling sockets.
    const shutdown = (signal) => {
      // eslint-disable-next-line no-console
      console.log(`\n> ${signal} received, shutting down...`);
      server.close(() => process.exit(0));
    };
    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error('Failed to start Next.js app:', err);
    process.exit(1);
  });
