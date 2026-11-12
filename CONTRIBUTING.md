# Contributing

Please open one pull request per suggestion, and make sure the link works.

## Guidelines

- Search the list first so the entry is not a duplicate.
- The addition should be a useful, publicly accessible resource for cubers or people studying twisty puzzles.
- Use the format `- [Name](https://example.com/) - Description.`
- Keep the description short, factual, and neutral. Do not use superlatives or marketing language.
- Start the description with a capital letter and end it with a period.
- Prefer official or canonical URLs, and use HTTPS when the certificate is valid.
- Add the entry under the most relevant section, in alphabetical order by name (the Official & Competitions section keeps WCA resources grouped).
- One link is the primary entry. A second URL may be mentioned in the description (for example a source repository) if it helps.
- If you are affiliated with the project you are adding, say so in the pull request.
- Check spelling, grammar, and trailing whitespace.

## Not a good fit

- Broken, parked, or redirect-to-marketplace links.
- Purely commercial posts whose only purpose is to sell a product, except shops already listed for historical continuity.
- Unverified claims, personal blogs without a clearly useful resource, or copies of something already listed.

New sections are welcome if they group several entries better than the current headings.

## Translations

This repository ships the same list in 12 languages (`README.md` and `README.*.md`), matching the languages of [Cube Solver Lab](https://cube-solver.org/).

- Add or change entries in every language file, in the same section and the same order, with the same URLs.
- If you cannot update every translation, add the entry to the English `README.md` first and say in the pull request that the other languages still need to be synced.
- Run `node tools/check-sync.js` before opening a pull request. It checks that every translation has the same HTTP(S) URLs in the same order as `README.md`, and that each table of contents uses GitHub-compatible heading anchors.
- Keep resource names, URLs, and code unchanged. Translate only the surrounding prose and descriptions.
- Bahasa Melayu (`README.ms.md`) must not be a copy of Bahasa Indonesia (`README.id.md`).
