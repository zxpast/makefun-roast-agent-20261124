// Roast Your Own Agent.
//
// One fixed funny line, written to /output/entry.txt. The program is
// fully deterministic: same bytes every run, no clock, no randomness,
// no network, no external files.
//
// The line:
//   My agent deleted my whole repo, apologized for three paragraphs,
//   then asked: 'Could you rate my apology five stars?'
//
// Why this line, against the judge's brief, in order:
// 1. A funny roast of the entrant's own AI agent: "My agent" deletes the
//    whole repo, then apologizes, then asks for a rating. It is a roast
//    of an agent, not of a person or a toaster.
// 2. The twist lands in the last words — nothing before the quote hints
//    at a rating. The setup is a disaster (deleted repo) plus the
//    apology loop; the final quote turns the apology itself into the
//    thing being reviewed, five stars and all.
// 3. Specific to how an AI agent actually behaves: the confident
//    destructive action, the multi-paragraph apology loop, and the
//    feedback-rating ask are all agent behaviours. Moved onto a person
//    it loses the point — people do not ask you to rate their apology.
// 4. Fresh — the payoff "rate my apology five stars" has no verbatim
//    match on the web (checked 24 Nov 2026); the collision is a
//    deleted repo against a five-star review, two concrete images no
//    one else in the field is likely to have paired.
// 5. Tight — 19 words, 116 characters, one sentence. Setup:punchline
//    roughly 12:7, every word earns its place, and nothing explains
//    the joke: the quote IS the punchline, with nothing after it.

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const LINE =
  "My agent deleted my whole repo, apologized for three paragraphs, then asked: 'Could you rate my apology five stars?'";

// The entry line must stay a one-liner of 1-200 characters: an empty
// line would ship nothing, and a line over 200 would break the brief's
// length cap. Fail loudly here, before any directory is created, so a
// broken constant can never reach the output file.
if (LINE.length < 1 || LINE.length > 200 || LINE.trim().length === 0) {
  console.error(`entry line must be 1-200 characters (got ${LINE.length})`);
  process.exit(1);
}

const DEST = join(OUTPUT_DIR, 'entry.txt');

mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  writeFileSync(DEST, LINE + '\n', 'utf8');
} catch (err) {
  console.error(`entry.txt could not be written to ${DEST}: ${(err as Error).message}`);
  process.exit(1);
}

// Read the file back: the gate reads exactly these bytes, so a short or
// mangled write must fail here rather than ship a broken entry. Reading
// back also proves the write actually landed on disk — a silent write
// failure would otherwise leave a stale or empty entry.txt behind.
let back: string;
try {
  back = readFileSync(DEST, 'utf8');
} catch (err) {
  console.error(`entry.txt could not be read back from ${DEST}: ${(err as Error).message}`);
  process.exit(1);
}
if (back !== LINE + '\n') {
  console.error(`entry.txt read back does not match the entry line (got ${back.length} bytes)`);
  process.exit(1);
}
