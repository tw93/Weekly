# Incidents

## 2026-10-30: Subscription preferences

Duplicate detection ignored language membership, and new contacts could inherit an unselected topic through Resend defaults. Contact creation and existing-contact updates now have distinct paths. The missing layer was preference-boundary testing; `tests/newsletter.test.js` covers language, explicit opt-outs, preserving existing preferences and failed lookups.

## 2026-10-30: Dialog and analytics lifecycle

Native Escape closure left the body scroll-locked. The idle analytics fallback could initialise again after interaction. The missing layer was browser lifecycle testing; `tests/browser-regressions.test.js` covers native-close cleanup and fallback followed by interaction.

## 2026-10-30: Share-image GPS metadata

133 JPEG share images carried a GPS directory, including 132 with coordinates. Removed GPS without re-encoding the images, preserving decoded pixels, orientation and ICC profiles. The missing layer was asset validation; `tests/image-privacy.test.js` now checks all published JPEG share images for GPS directories, with positive controls for both TIFF byte orders.

## 2026-11-08: Header row off its centre line

On phones the cup sat 2px above the title on the home page and 3px on an issue page, English titles ran another 1.3px low, and the home, phone issue and desktop issue rows sat on three lines (46.5, 46, 48), so the row jumped between pages. The code copy label sat 6px above the first code line it shares a row with. Each came from a negative margin compensating another, tuned against CSS boxes rather than ink. The missing layer was an ink check across pages and widths; `tests/browser-regressions.test.js` now fails on the compensating margins and on a copy label off the code line.

## 2026-11-17: New issue missing from older issues' sidebars

A reader opening 289 after 290 was published saw no 290 in the left sidebar; other issues looked fine. The service worker served issue pages stale-while-revalidate, on the premise that an issue never changes after publishing, but every issue page carries the whole issue list, so each page read before a publish showed the old list once more. Issue pages now go network-first and use the cache only offline. The missing layer was a test of what the worker answers when cache and network disagree; `tests/browser-regressions.test.js` runs `public/sw.js` with a cached page and fails on the old handler. tw93.fun posts and hina.day articles had the same handler and were changed with it.
