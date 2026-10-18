---
name: publish-issue
description: >-
  Publish one Weekly issue end to end: move the Chinese draft from the MiaoYan
  iCloud folder into the repo, write the English twin, convert the cover, commit,
  react to the issue's GitHub Discussion, and fill in the Telegram channel post for
  the maintainer to send. Use for 发周刊, 迁移周刊, 做英文版, 点表情, 发到频道.
  Not for editing a published issue or the site code.
metadata:
  version: "1.0.0"
---

# Publish Issue

Done means the issue is live on `main` in both languages, its Discussion carries the six positive reactions, and the Telegram send dialog holds the cover and caption, waiting for the maintainer.

## 1. Content

- Draft: `~/Library/Mobile Documents/iCloud~com~tw93~miaoyan/Documents/潮流/潮流周刊（第{n}期） - {标题}.md`. Copy it to `src/pages/posts/{n}-{标题}.md` unchanged except the date.
- Date: the draft template carries a stale `date: 2026/11/12`. Use the Monday after publishing, one week after the previous issue's date (285 was 2026/10/12, 286 2026/10/19), and say so in the report.
- English twin: `src/pages/en/posts/{n:03}-{English-Slug}.md`, translated by hand in the voice of the previous English issue (section names: Trending Tools, Just Looking Around, Random Thoughts). Keep every media tag and width; switch `/zh/` product links to their English pages after checking they return 200.
- Cover: the newest image in `~/Downloads`, converted with `sips -s format jpeg -s formatOptions 85 <src> --out public/assets/{n}.jpg`.
- Missing media the text refers to: search earlier issues first (`rg` over `src/pages/posts`), reuse the exact tag, and add it to both twins.
- Run `pnpm sync:content` and `pnpm test`, check `dist/posts/{n}/` and `dist/en/posts/{n}/` exist, then commit and push per the global Git rules. `git fetch` first: the bot commits `Updated content` to `main` often.

## 2. Discussion reactions

Each issue gets a Discussion titled with its number (286 is #322). React as `tw93` with THUMBS_UP, LAUGH, HOORAY, HEART, ROCKET and EYES, never THUMBS_DOWN or CONFUSED:

```bash
n=286  # the issue number
num=$(gh api graphql -f query='{repository(owner:"tw93",name:"Weekly"){discussions(first:10,orderBy:{field:CREATED_AT,direction:DESC}){nodes{number title}}}}' \
  -q ".data.repository.discussions.nodes[] | select(.title==\"$n\") | .number" | tail -1)
id=$(gh api graphql -f query="{repository(owner:\"tw93\",name:\"Weekly\"){discussion(number:$num){id}}}" -q .data.repository.discussion.id)
for r in THUMBS_UP LAUGH HOORAY HEART ROCKET EYES; do
  gh api graphql -f query='mutation($s:ID!,$c:ReactionContent!){addReaction(input:{subjectId:$s,content:$c}){reaction{content}}}' -f s="$id" -f c="$r"
done
```

Confirm `gh api user -q .login` is `tw93` first, and read `reactionGroups{content viewerHasReacted}` back afterwards. If the Discussion does not exist yet, say so instead of creating one.

## 3. Telegram channel post

Channel 「Newlearnerの自留地」 (@NewlearnerChannel) in AyuGram, posted as Tw93. Read the desktop skill first. The agent fills the dialog and stops; the maintainer clicks Send or right-clicks it to schedule. Never click Send, Schedule or a menu item, and never use the Scheduled Messages view.

Caption, copied from the previous issue (`curl -sL 'https://t.me/s/NewlearnerChannel?q=潮流周刊'` shows its HTML):

```html
#潮流周刊 #Newsletter<br><br><a href="https://weekly.tw93.fun/posts/{n}">潮流周刊（第{n}期） - {标题}</a><br><br>{封面说明}<br><br>潮流工具<br>1. …<br><br><b>随便看看</b><br>1. …<br><br><b>随便写写</b><br>1. …<br><br>频道：@NewlearnerChannel
```

List the bold item titles per section from the draft; drop a section the draft does not have. Keep hashtags plain text, not links.

Steps, each verified before the next:

1. Tell the maintainer to stop dictating, typing and copying for a minute. Dictation goes into whatever field AyuGram has focused, and a copy between steps replaces the cover on the clipboard; both happened on 286.
2. Open the channel's normal view with an empty input box.
3. `osascript -e 'set the clipboard to (read (POSIX file "<repo>/public/assets/{n}.jpg") as JPEG picture)'`, then click the input box and press `super+v` right away. The "Send an image" dialog must show the new cover.
4. Click the Caption field and `app.paste(caption, {format: "html"})`.
5. Read the Caption field's value from the AX tree: it must be the caption exactly once with nothing appended. Screenshot to confirm the title renders as a link.
6. Stop and report. Context menus (right-click, ⋮) are invisible to LCU screenshots and the AX tree, which is one more reason the final click is the maintainer's.
