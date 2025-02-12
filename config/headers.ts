interface SecurityHeader {
  key: string;
  value: string;
}

const securityHeaders: SecurityHeader[] = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Content-Security-Policy', value: `frame-ancestors 'self' https://app.contentful.com https://app.eu.contentful.com` },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  { key: 'Referrer-Policy', value: 'no-referrer' },
];

const secuityHeadersConfig = async () => [
  {
    source: '/:path*',
    headers: securityHeaders,
  },
];

export default secuityHeadersConfig;
