import { notFound } from 'next/navigation';

export default function UnknownLocalePage({
  params,
}: {
  params: { locale: string; slug: string[] };
}) {
  notFound();
}
