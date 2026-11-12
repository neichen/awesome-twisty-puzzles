#!/usr/bin/env node
/**
 * Verify that every translated README has the same HTTP(S) URLs
 * in the same order as README.md, and that TOC anchors match
 * GitHub's heading slug rules (github-slugger 2.0.0).
 *
 * Usage: node tools/check-sync.js
 * No npm dependencies.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const { githubSlug } = require('./github-slug.js');

const ROOT = path.resolve(__dirname, '..');
const PRIMARY = 'README.md';
const TRANSLATIONS = [
  'README.zh-Hans.md',
  'README.zh-Hant.md',
  'README.ja.md',
  'README.es.md',
  'README.pt.md',
  'README.fr.md',
  'README.de.md',
  'README.ru.md',
  'README.ar.md',
  'README.id.md',
  'README.ms.md',
];

const TOC_SKIP_HEADINGS = new Set([
  // Not linked from the Contents list in any language.
]);

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), 'utf8');
}

function extractHttpUrls(md) {
  const urls = [];
  const re = /\[[^\]]*\]\((https?:\/\/[^)\s]+)\)/g;
  let m;
  while ((m = re.exec(md))) urls.push(m[1]);
  return urls;
}

function extractHeadings(md) {
  const headings = [];
  for (const line of md.split(/\r?\n/)) {
    const m = /^(#{1,6}) (.+)$/.exec(line);
    if (m) headings.push({ level: m[1].length, text: m[2].trim(), slug: githubSlug(m[2].trim()) });
  }
  return headings;
}

function extractTocHrefs(md) {
  // Links in the Contents section only: from the Contents heading until the next heading.
  const lines = md.split(/\r?\n/);
  const hrefs = [];
  let inToc = false;
  for (const line of lines) {
    if (/^## /.test(line)) {
      if (inToc) break;
      inToc = true;
      continue;
    }
    if (!inToc) continue;
    const m = /\[[^\]]*\]\((#[^)]+)\)/.exec(line);
    if (m) hrefs.push(m[1].slice(1));
  }
  return hrefs;
}

function headingSlugMap(headings) {
  const seen = Object.create(null);
  const list = [];
  for (const h of headings) {
    let slug = h.slug;
    const original = slug;
    if (seen[slug] != null) {
      seen[original]++;
      slug = original + '-' + seen[original];
    } else {
      seen[slug] = 0;
    }
    list.push({ ...h, slug });
  }
  return list;
}

let errors = 0;
function fail(msg) {
  console.error('FAIL:', msg);
  errors++;
}

const primaryMd = read(PRIMARY);
const primaryUrls = extractHttpUrls(primaryMd);
if (primaryUrls.length === 0) fail(PRIMARY + ' has no HTTP(S) URLs');

console.log(PRIMARY + ': ' + primaryUrls.length + ' HTTP(S) URLs');

for (const file of TRANSLATIONS) {
  const fp = path.join(ROOT, file);
  if (!fs.existsSync(fp)) {
    fail(file + ' is missing');
    continue;
  }
  const md = read(file);
  const urls = extractHttpUrls(md);
  if (urls.length !== primaryUrls.length) {
    fail(file + ' has ' + urls.length + ' HTTP(S) URLs, expected ' + primaryUrls.length);
  }
  const n = Math.max(urls.length, primaryUrls.length);
  for (let i = 0; i < n; i++) {
    if (urls[i] !== primaryUrls[i]) {
      fail(file + ' URL[' + i + ']: got ' + (urls[i] || '(missing)') + ' expected ' + (primaryUrls[i] || '(missing)'));
    }
  }

  const headings = headingSlugMap(extractHeadings(md));
  const toc = extractTocHrefs(md);
  if (toc.length === 0) fail(file + ' has no Contents anchors');
  // Contents should point at later ## headings (skip the # title and the Contents heading itself).
  const h2 = headings.filter((h) => h.level === 2);
  // First H2 is Contents; TOC targets the following resource H2s, not Contributing/License/Trademark at the end.
  const resourceH2 = h2.slice(1, 1 + toc.length);
  if (resourceH2.length !== toc.length) {
    fail(file + ' Contents has ' + toc.length + ' links but found ' + resourceH2.length + ' following H2 headings to match');
  }
  for (let i = 0; i < toc.length; i++) {
    const want = resourceH2[i] && resourceH2[i].slug;
    if (toc[i] !== want) {
      fail(file + ' TOC[' + i + '] is #' + toc[i] + ', GitHub slug for "' + (resourceH2[i] && resourceH2[i].text) + '" is #' + want);
    }
  }

  // Disclosure / in-body heading links must also resolve.
  const bodyHeadingLinks = [];
  const re = /\[[^\]]*\]\((#[^)]+)\)/g;
  let m;
  while ((m = re.exec(md))) bodyHeadingLinks.push(m[1].slice(1));
  const slugSet = new Set(headings.map((h) => h.slug));
  for (const slug of bodyHeadingLinks) {
    if (!slugSet.has(slug)) fail(file + ' links to missing heading #' + slug);
  }
}

// Also check English TOC against its own slugs.
{
  const headings = headingSlugMap(extractHeadings(primaryMd));
  const toc = extractTocHrefs(primaryMd);
  const h2 = headings.filter((h) => h.level === 2);
  const resourceH2 = h2.slice(1, 1 + toc.length);
  for (let i = 0; i < toc.length; i++) {
    const want = resourceH2[i] && resourceH2[i].slug;
    if (toc[i] !== want) {
      fail(PRIMARY + ' TOC[' + i + '] is #' + toc[i] + ', GitHub slug for "' + (resourceH2[i] && resourceH2[i].text) + '" is #' + want);
    }
  }
}

if (errors) {
  console.error('\n' + errors + ' problem(s) found.');
  process.exit(1);
}
console.log('OK: all translations match URL set/order, and TOC anchors match GitHub slugs.');
