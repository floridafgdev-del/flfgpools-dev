export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://flfgpools.com');

export const SOCIAL_LINKS = {
  instagram: 'https://www.instagram.com/floridafiberglasspools/',
  facebook: 'https://www.facebook.com/profile.php?id=61556514011011',
  whatsapp: '17862071634',
  whatsappDisplay: '+1 (786) 207-1634',
  yelp: 'https://www.yelp.com/biz/florida-fiberglass-pools-miami',
  email: 'sales@flfgpools.com',
  email_principal: 'floridafiberglasspools@gmail.com',
  phone: '+17862071634',
  phoneDisplay: '+1 (786) 207-1634',
  address: {
    street: '21500 S Dixie Hwy',
    city: 'Miami',
    state: 'FL',
    zip: '33189',
    country: 'US',
  },
  hours: {
    weekday: '9am – 5pm',
    saturday: '9am – 6pm',
    sunday: 'Closed',
  },
} as const;

export const BUSINESS_INFO = {
  name: 'Florida Fiberglass Pools',
  legalName: 'Florida Fiberglass Pools LLC',
  foundedYear: 2013,
  serviceArea: ['Monroe County', 'Miami-Dade County', 'Broward County', 'Palm Beach County', 'Sarasota County'],
  showroomSize: '8,000 sqft',
} as const;

export const SEO_CONFIG = {
  siteUrl: SITE_URL,
  title: 'Florida Fiberglass Pools',
  shortName: 'FLFG Pools',
  description:
    'Supplier and installer of inground and above ground fiberglass pools in South Florida since 2013. 1000+ pools delivered with 15-year warranty. Serving across Indian River, St. Lucie,  Martin, Palm Beach, Broward, Miami-Dade, Monroe, Collier, Hendry, Glades, Lee, Charlotte, DeSoto, Hardee, Highlands and Okeechobee Counties.',
  keywords: [
    'fiberglass pools Miami',
    'piscinas de fibra de vidrio Florida',
    'pool installation South Florida',
    'inground pools Miami-Dade',
    'piscinas fibra Miami',
    'pool supplier Broward',
    'fiberglass pool installation',
    'fiberglass spa Florida',
    'tanning ledge pool',
    'above ground fiberglass pools',
    'piscinas de fibra de vidrio',
    'Florida pool supplier',
  ],
  twitter: '@flfgpools',
  ogImage: '/opengraph-image',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  geoCoordinates: { latitude: 25.5863, longitude: -80.3868 },
  googleVerification: '',
  localeMap: {
    en: 'en_US',
    es: 'es_US',
    pt: 'pt_BR',
  },
} as const;