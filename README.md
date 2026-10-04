# OccPsych

An installable study app for MSc-level occupational psychology, covering the seven areas that BPS-accredited MSc programmes teach:

1. Psychological Assessment at Work
2. Learning, Training and Development
3. Leadership, Engagement and Motivation
4. Well-Being and Work
5. Work Design, Organisational Change and Development
6. Research Design, Advanced Data Gathering and Analytical Techniques
7. Applying Psychology to Work and Organisations

**Live app:** https://dlockwood13.github.io/occpsych/

## What is inside

- 49 lessons, each broken into short steps: warm-up questions, a plain-English explanation, key concepts, the main text, evidence with confidence tags, a model critical paragraph (TEEEL), critique, UK practice and a recall check.
- 234 flashcards scheduled with FSRS-4.5, the open spaced-repetition algorithm used by Anki. A missed card returns until you recall it in the same session.
- 105 quiz questions with interleaving and a confidence rating on every answer ([Certain], [Likely] or [Guessing]), plus calibration feedback.
- A Feynman Lab and a TEEEL Builder. Both can hand a ready-made prompt to Claude for feedback.
- A library of around 380 APA 7 references. Each is labelled with its currency (2021 or later, or foundational) and whether it was checked against a source page when the content was built.
- A glossary, search, a 12-week plan, progress stats, a study-day heatmap, listening mode (text to speech) and a calendar reminder.

## How it works

- Single-file app: `index.html` contains the content, the app code and vendored React 18 and htm. There is no build step and no CDN.
- Works offline once loaded. `sw.js` caches only this app's files, under cache names starting `occpsych-`.
- Progress is stored on the device only, in IndexedDB. Use Settings, then Backup, to move progress between devices. Nothing is sent anywhere.

## Content caveats

The content was researched and written with Claude in October 2026. References marked "Not checked in build" are mostly foundational works that were not re-verified during the build. Check primary sources before you cite them in assessed work. The app builds knowledge. It does not replace a BPS-accredited MSc, supervised practice or HCPC registration.

## Licences

- React and React DOM: MIT. htm: Apache-2.0.
- Fonts (Bricolage Grotesque, Atkinson Hyperlegible, IBM Plex Mono): SIL Open Font License 1.1. The licence files are the `LICENSE-*.txt` files in this repository.
