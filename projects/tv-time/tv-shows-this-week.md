# TV Time: Shows This Week

Use `TV_SHOW_WATCHLIST.md` in this project as the source of truth for which shows are active.

## Watchlist behavior

- An unchecked checklist item (`- [ ] Show Name`) is an active, tracked show.
- A checked checklist item (`- [x] Show Name`) is paused and must not be researched or included.
- Keep exactly one show per checklist line.
- Preserve comments and paused entries when editing the watchlist.
- If there are no active shows, ask the user which TV shows they care about. After they answer, save each show as its own unchecked checklist item in `TV_SHOW_WATCHLIST.md`. Do not research a weekly schedule until at least one active show is available.

## Weekly research

For every active show, research current web sources to determine whether it has a genuinely new episode, season or series premiere, special, or season or series finale during the current Monday-through-Sunday calendar week in `America/New_York`.

- Calculate the week's exact Monday and Sunday dates in `America/New_York`, and state that date range.
- Include only releases that first become available or first air during that week.
- Exclude reruns, repeats, encore broadcasts, and episodes or specials first released in an earlier week.
- Prefer official network, broadcaster, production, or streaming-service schedules and show pages. Use reputable secondary sources only when official information is unavailable or incomplete.
- Reconcile conflicting dates carefully, accounting for time zones and late-night listings.
- Report uncertainty explicitly. Do not turn an unconfirmed schedule into a confident `Yes`.
- Link directly to the sources supporting each result.
- For each qualifying new episode or event, include a concise, spoiler-light official description when one is available.
- Include links to official trailers, teasers, clips, or episode previews when available. Clearly label unofficial previews and use them only when no official preview can be found.

## Response

Return a concise Markdown table with one row per active show and these columns:

| Show | This week? | Date | Episode/event | Where to watch | Sources |
|---|---|---|---|---|---|

Use `Yes` or `No` in **This week?**. For a `No`, use `—` where no date or event applies. Add a short uncertainty note immediately below the table when evidence is incomplete, conflicting, or provisional.

Below the table, add a compact **Descriptions and previews** section for every `Yes` row. Include the spoiler-light description and linked previews, or state that no preview was found.
