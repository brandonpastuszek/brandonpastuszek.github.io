# Dice Duel

A local, pass-and-play Angular dice game for two players sharing one screen.

## Play instantly (no server)

Open `standalone/index.html` in any modern browser. That single file contains the complete game and works offline—there is nothing to install and no server to run.

Place a phone or tablet flat between the two players; Player 1 reads from the top and Player 2 from the bottom.

## Angular source (optional)

The editable Angular/TypeScript source remains in `src/`. Developers can run it with Node.js 20.19 or newer using `npm install` and `npm start`, but this is not needed to play the standalone edition.

## Rules

- Each player gets one turn with up to three rolls.
- Tap any die after rolling to hold it. Held dice stay unchanged on the next roll.
- Tap **Bank score** to finish a turn early, or the turn ends automatically after roll three.
- After both players complete their three rolls, the highest hand wins.
