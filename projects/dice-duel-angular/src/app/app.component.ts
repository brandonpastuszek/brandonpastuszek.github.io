import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Player {
  name: string;
  color: string;
  scores: number[];
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  readonly players = signal<Player[]>([
    { name: 'Player 1', color: '#ffcb45', scores: [] },
    { name: 'Player 2', color: '#ff6b5c', scores: [] }
  ]);
  readonly activePlayer = signal(0);
  readonly dice = signal([1, 1, 1, 1, 1]);
  readonly held = signal([false, false, false, false, false]);
  readonly rolls = signal(0);
  readonly rolling = signal(false);
  readonly gameOver = signal(false);

  readonly currentTotal = computed(() => this.dice().reduce((sum, die) => sum + die, 0));
  readonly totals = computed(() =>
    this.players().map((player) => player.scores.reduce((sum, score) => sum + score, 0))
  );
  readonly status = computed(() => {
    if (this.gameOver()) {
      const [one, two] = this.totals();
      return one === two ? 'It’s a draw!' : `${one > two ? 'Player 1' : 'Player 2'} wins!`;
    }
    if (this.rolls() === 0) return `${this.players()[this.activePlayer()].name}, roll the dice`;
    if (this.rolls() === 3) return `Turn score: ${this.currentTotal()}`;
    return 'Tap dice to hold, then roll again';
  });

  pipPositions(value: number): number[] {
    const map: Record<number, number[]> = {
      1: [4],
      2: [0, 8],
      3: [0, 4, 8],
      4: [0, 2, 6, 8],
      5: [0, 2, 4, 6, 8],
      6: [0, 2, 3, 5, 6, 8]
    };
    return map[value];
  }

  scoreFor(player: number, round: number): string {
    return this.players()[player].scores[round]?.toString() ?? '—';
  }

  roll(): void {
    if (this.rolling() || this.gameOver() || this.rolls() >= 3) return;
    this.rolling.set(true);
    let ticks = 0;
    const animation = window.setInterval(() => {
      this.dice.update((dice) =>
        dice.map((value, index) => this.held()[index] ? value : this.randomDie())
      );
      ticks++;
      if (ticks >= 10) {
        window.clearInterval(animation);
        this.rolls.update((rolls) => rolls + 1);
        this.rolling.set(false);
        if (this.rolls() === 3) {
          window.setTimeout(() => this.bank(), 700);
        }
      }
    }, 55);
  }

  toggleHold(index: number): void {
    if (this.rolls() === 0 || this.rolls() >= 3 || this.rolling() || this.gameOver()) return;
    this.held.update((held) => held.map((value, dieIndex) => dieIndex === index ? !value : value));
  }

  bank(): void {
    if (this.rolls() === 0 || this.rolling() || this.gameOver()) return;
    const playerIndex = this.activePlayer();
    this.players.update((players) =>
      players.map((player, index) =>
        index === playerIndex
          ? { ...player, scores: [...player.scores, this.currentTotal()] }
          : player
      )
    );

    if (playerIndex === 1) {
      this.gameOver.set(true);
      return;
    }

    this.activePlayer.set(playerIndex === 0 ? 1 : 0);
    this.dice.set([1, 1, 1, 1, 1]);
    this.held.set([false, false, false, false, false]);
    this.rolls.set(0);
  }

  restart(): void {
    this.players.set([
      { name: 'Player 1', color: '#ffcb45', scores: [] },
      { name: 'Player 2', color: '#ff6b5c', scores: [] }
    ]);
    this.activePlayer.set(0);
    this.dice.set([1, 1, 1, 1, 1]);
    this.held.set([false, false, false, false, false]);
    this.rolls.set(0);
    this.rolling.set(false);
    this.gameOver.set(false);
  }

  private randomDie(): number {
    return Math.floor(Math.random() * 6) + 1;
  }
}
