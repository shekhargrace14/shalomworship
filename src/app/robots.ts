export const dynamic = 'force-static';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/search', '/search/', '/search?', '/private/', '/dashboard', '/condition'],
      },
    ],
    sitemap: 'https://www.shalomworship.com/sitemap.xml',
  };
}
