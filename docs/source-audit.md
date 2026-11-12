# Source audit (2026-11-12)

How entries from [nirajpandkar/awesome-rubiks-cube](https://github.com/nirajpandkar/awesome-rubiks-cube) (last merged 2017-10-12, CC0) and its open [PR #3](https://github.com/nirajpandkar/awesome-rubiks-cube/pull/3) were handled. Links were checked with `curl -L` and a browser User-Agent from this environment. Plain HTTP often failed here because of a local proxy; HTTPS was preferred.

## Kept or URL fixed

| Original | Action | New URL |
| --- | --- | --- |
| Dan Brown video | Kept | https://www.youtube.com/watch?v=HsQIoPyfQzM |
| Official site, rubiks.com | Updated to the canonical HTTPS host | https://rubiks.com/ |
| CubeMastery (unmerged PR #3) | Included; the tutorial page returned 200 | https://cubemastery.com/rubiks-cube-tutorial-step-by-step/ |
| CrazyBadCuber YouTube | Kept | https://www.youtube.com/user/crazybadcuber |
| JRCuber YouTube | Kept | https://www.youtube.com/user/JRCuber |
| Ruwix beginner's method | Kept | https://ruwix.com/the-rubiks-cube/how-to-solve-the-rubiks-cube-beginners-method/ |
| Ruwix CFOP / Fridrich | Kept | https://ruwix.com/the-rubiks-cube/advanced-cfop-fridrich/ |
| Speedsolving Wiki Roux method | Kept | https://www.speedsolving.com/wiki/index.php/Roux_Method |
| Speedsolving Wiki ZZ method | Kept | https://www.speedsolving.com/wiki/index.php/ZZ_Method |
| CubeTimer | HTTP original failed; HTTPS works | https://cubetimer.com/ |
| CubingTime timer | HTTP original failed; HTTPS works (slow, but 200 with the correct title) | https://cubingtime.com/timer |
| Ruwix timer | Kept | https://ruwix.com/online-rubiks-stopwatch-timer/ |
| SpeedSolving.com forum | Kept | https://www.speedsolving.com/ |
| Reddit r/Cubers | Kept | https://www.reddit.com/r/Cubers/ |
| WCA competitions | Kept | https://www.worldcubeassociation.org/competitions |
| TheCubicle (`www.thecubicle.us`, missing scheme in the original) | Moved to the current store host | https://www.thecubicle.com/ |
| Cubelelo | HTTP original failed; HTTPS works | https://www.cubelelo.com/ |
| "Road to Sub-10" thread 6085 | Forum URL scheme changed; same thread, retitled | https://www.speedsolving.com/threads/cfop-discussion.6085/ |

## Dropped

| Original | Why |
| --- | --- |
| You Can Do The Cube (`youcandothecube.com/secret-unlocked/solution-stage-one.aspx`) | HTTPS certificate does not match the hostname; HTTP did not return a page. The official beginner guide is now at [rubiks.com/solve-guide](https://rubiks.com/solve-guide), which is listed instead. |
| Official Roux method (`http://grrroux.free.fr/method/Intro.html`) | Could not verify with curl: HTTPS closed the TLS handshake, and HTTP returned nothing useful through this environment. Search engines still appear to index the site, but it is not listed until it can be confirmed. The Roux method is covered by the Speedsolving Wiki entry. |
| Lubix Cube (`lubixcube.com/Roux.html`) | Domain now redirects to a HugeDomains for-sale page. |
| Badmephisto website (`http://badmephisto.com/`) | The classic site still serves content, but HTTPS uses a self-signed certificate that expired in October 2021, and HTTP could not be verified through this environment. The [YouTube channel](https://www.youtube.com/user/badmephisto) is listed instead. |
| CubeComps (`cubecomps.com`) | The domain no longer hosts the live-results tool. `https://cubecomps.com/` currently serves unrelated “Casino Strategies” content. Use [WCA Live](https://live.worldcubeassociation.org/) instead. |
| Rubik's Store (`https://www.rubiks.com/store`) | Returns 404. The brand homepage is listed instead. |

## Other checks of note

- `https://cube.crider.co.uk/visualcube.php` (a common VisualCube URL) now serves a parked / domain-for-sale page. The working VisualCube hosts verified here are `https://cube.rider.biz/visualcube.php` and `https://visualcube.api.cubing.net/`. The list uses the former.
- `fewestmov.es` redirects to `https://333.fm/`, which is the current Insertion Finder / FMC site listed here.
- `https://github.com/cubing/twsearch` redirects to `https://github.com/cubing/twips`.
- `https://www.youtube.com/@FeliksZemdegs` resolved to a channel titled “Jason Jackson”, so it was not listed. CubeSkills (site and YouTube) is listed instead.
