import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScoresService } from '../scores.service';
import { PlayerDataService } from '../player-data.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-my-scores',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-scores.component.html',
  styleUrl: './my-scores.component.scss',
})
export class MyScoresComponent implements OnInit {
  @Input() game!: string;
  myScores: any[] = [];
  sortOrder: boolean = true;
  private updateSubscription!: Subscription;

  constructor(
    private _scoresService: ScoresService,
    private _playerDataService: PlayerDataService
  ) {}

  ngOnInit(): void {
    this.loadMyScores();
    this.updateSubscription = interval(30000).subscribe(() =>
      this.loadMyScores()
    );
  }

  ngOnDestroy(): void {
    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe();
    }
  }

  loadMyScores(): void {
    const playerName = this._playerDataService.getPlayerName();
    if (playerName) {
      this._scoresService.getMyScores(this.game).subscribe({
        next: (scores) => {
          console.log('Received scores:', scores);
          if (Array.isArray(scores)) {
            this.myScores = scores.filter((score) => score.name === playerName);
            this.sortScores();
          } else {
            console.error('Received data is not an array:', scores);
          }
        },
        error: (error) => {
          console.error('Error loading scores:', error);
        },
      });
    } else {
      console.warn('No player name available in local storage.');
    }
  }

  toggleSortOrder(): void {
    this.sortOrder = !this.sortOrder;
    this.sortScores();
  }

  private sortScores(): void {
    this.myScores.sort((a, b) =>
      this.sortOrder ? b.score - a.score : a.score - b.score
    );
  }
}
