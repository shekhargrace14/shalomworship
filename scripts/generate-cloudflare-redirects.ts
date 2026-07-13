import fs from 'node:fs';
import path from 'node:path';
import { redirects } from '../data/redirects';

const DOMAIN = 'https://www.shalomworship.com';

const lines = [['Source URL', 'Target URL', 'Status', 'Include subdomains', 'Subpath matching', 'Preserve query string'].join(',')];

for (const redirect of redirects) {
  lines.push([`${DOMAIN}${redirect.source}`, `${DOMAIN}${redirect.destination}`, '301', 'false', 'false', 'true'].join(','));
}

const output = path.join(process.cwd(), 'public', 'redirects.csv');

fs.writeFileSync(output, lines.join('\n'));

console.log(`✅ Generated ${redirects.length} redirects`);
console.log(output);
