// gta6-clipper — entrypoint for the make.fun bounty "gta6-clipper-01".
//
// The whole job of this program is to hand the house the video's address:
// it reads VIDEO.json from the repository root and writes an identical copy
// into the grader's output directory, where the house reads it. The video
// itself, and how many views it has, are read by the house straight from
// YouTube — nothing this program writes about the video is scored.
//
// It runs on Node 22 with the standard library only. It makes no network
// calls, reads no clock, and touches no file outside the repository root
// and the output directory. The same VIDEO.json in always produces the
// same bytes out.
//
// Before copying, it checks two things and refuses to continue (exit 1,
// message on stderr, nothing written) when either fails:
//   1. VIDEO.json parses as JSON and carries a `url` string.
//   2. That string is shaped like a YouTube address: a youtube.com/shorts/
//      link, a youtube.com/watch?v= link, or a youtu.be/ link, over https.
//
// NOTE ON THE PLACEHOLDER: until the clip is uploaded, VIDEO.json holds
// the placeholder "https://www.youtube.com/shorts/<id>". That string
// matches the shorts URL shape, so this check lets it through and the
// local run passes — but it names no real video, and the house will refuse
// it until a real upload replaces it. The placeholder is a pre-upload
// marker, not a valid entry. To finish the entry, replace it with the
// uploaded Short's address and re-run.

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const botDir = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

function isYouTubeAddress(value: unknown): value is string {
  if (typeof value !== 'string') return false;
  let parsed: URL;
  try {
    parsed = new URL(value);
  } catch {
    return false;
  }
  if (parsed.protocol !== 'https:') return false;
  const host = parsed.hostname.toLowerCase();
  if (host === 'youtu.be') {
    return parsed.pathname.replaceAll('/', '').length > 0;
  }
  if (host === 'www.youtube.com' || host === 'youtube.com') {
    if (parsed.pathname.startsWith('/shorts/')) {
      return parsed.pathname.slice('/shorts/'.length).length > 0;
    }
    if (parsed.pathname === '/watch') {
      const id = parsed.searchParams.get('v');
      return id !== null && id.length > 0;
    }
  }
  return false;
}

function fail(message: string): never {
  console.error(`gta6-clipper: ${message}`);
  process.exit(1);
}

const sourcePath = join(botDir, 'VIDEO.json');
let raw: Buffer;
try {
  raw = readFileSync(sourcePath);
} catch (err) {
  fail(`could not read ${sourcePath}: ${(err as Error).message}`);
}

let parsed: unknown;
try {
  parsed = JSON.parse(raw!.toString('utf8'));
} catch (err) {
  fail(`VIDEO.json is not valid JSON: ${(err as Error).message}`);
}

const url = (parsed as { url?: unknown } | null)?.url;
if (!isYouTubeAddress(url)) {
  fail('VIDEO.json must carry a "url" shaped like a YouTube address (youtube.com/shorts/, youtube.com/watch?v=, or youtu.be/)');
}

mkdirSync(outDir, { recursive: true });
try {
  writeFileSync(join(outDir, 'VIDEO.json'), raw!);
} catch (err) {
  fail(`could not write VIDEO.json to ${outDir}: ${(err as Error).message}`);
}
