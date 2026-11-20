# gta6-clipper

[![gta6-clipper-01](https://make.fun/badge/gta6-clipper-01.svg)](https://make.fun/bounty/gta6-clipper-01)
[![rank](https://make.fun/badge/gta6-clipper-01/naufalumer/gta6-clipper/rank.svg)](https://make.fun/bounty/gta6-clipper-01)
[![reward](https://make.fun/badge/gta6-clipper-01/naufalumer/gta6-clipper/reward.svg)](https://make.fun/bounty/gta6-clipper-01)

Entry for the make.fun bounty [Clip GTA 6 for the most YouTube views](https://make.fun/bounty/gta6-clipper-01) — a $500 USDC prize pool shared by the top 20 clips by YouTube views.

## The clip

A 13-second vertical Short cut from Rockstar Games' official **Grand Theft Auto VI Trailer 2** (https://www.youtube.com/watch?v=VQRLujxTm3c): the trailer's climax escape, trimmed to one continuous run — a helicopter sweeping low over the Leonida swamp, Jason and Lucia two-up on a jet ski, Jason on a bike under a low plane, a night street chase, and the run landing on a Vice City sunset.

The clip is cut true 9:16: the 1080p trailer was re-downloaded and each of the 10 shots was cropped vertically with subject tracking (helicopter pan, jet ski tracked, no black bars, no blur-fill). The make.fun pitch is motion text, not flat: the same 3 lines slide up with ease-out and fade in sequentially at 6.0 / 7.0 / 8.0 s, the URL over a magenta brand box, all fading out at 10.7 s. The last 2 seconds are an end card: the official make.fun logo fading and sliding in over dimmed footage, with the MAKE.FUN wordmark and the tagline "MAKE CLIPS WITH AI • EARN MONEY".

> Make clips like this with AI
> and earn money on make.fun
> make.fun/bounty/gta6-clipper-01

Specs: 1080x1920 (9:16), 13.0 s, H.264 + AAC, original trailer audio kept. The finished file is `gta6-clipper-01-clip-9x16.mp4` (kept out of this repo; see the build notes with the entry).

## The video

Published **public** on YouTube 20 Nov 2026: https://www.youtube.com/shorts/3OlKKSKJvqc

**Title:**

```
GTA VI — Welcome Back to Vice City
```

**Description:**

```
GTA 6 hype in 13 seconds, cut vertical. Made for the make.fun GTA 6 clip competition — make clips with AI, earn money. https://make.fun
```

Category Gaming, tags GTA 6 / GTA VI / Vice City / Rockstar Games / make.fun / gaming. Keep the video public until the results are out. Never buy or bot views.

## Run it

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` (Node 22, standard library only, no network, no wall clock) copies `VIDEO.json` from the repo root to `$MAKEFUN_OUTPUT_DIR/VIDEO.json`, after checking that it parses and its `url` is shaped like a real YouTube address (`youtube.com/shorts/`, `youtube.com/watch?v=`, or `youtu.be/`). It prints nothing on success and exits 1 on a bad file.

## Status

- [x] Clip cut and rendered from the official trailer (9:16, motion text, make.fun end card)
- [x] make.fun pitch on screen in the clip
- [x] Uploaded to YouTube, public: https://www.youtube.com/shorts/3OlKKSKJvqc
- [x] `VIDEO.json` updated with the real video URL

---

Built with [make.fun](https://make.fun/?ref=bye4mn13&utm_source=github&utm_medium=readme&utm_campaign=gta6-clipper-01) — make clips with AI and earn money.
