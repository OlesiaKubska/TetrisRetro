import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScoresService } from '../scores.service';
import { PlayerDataService } from '../player-data.service';
import { interval, Subscription } from 'rxjs';
import { Score } from '../definitions';
// import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-my-scores',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-scores.component.html',
  styleUrl: './my-scores.component.scss',
})
export class MyScoresComponent implements OnInit, OnDestroy {
  @Input() game: string = 'tetris';
  myScores: Score[] = [];
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

  loadMyScores(): void {
    const playerName = this._playerDataService.getPlayerName();
    if (playerName) {
      this._scoresService.getMyScores(playerName, this.game).subscribe({
        next: (scores) => {
          console.log('Received scores:', scores);
          this.myScores = scores.filter((score) => score.name === playerName);
          this.sortScores();
        },
        error: (error) => {
          console.error('Error loading scores:', error);
        },
      });
    }
  }

  toggleSortOrder(): void {
    this.sortOrder = !this.sortOrder;
    this.sortScores();
  }

  sortScores(): void {
    this.myScores.sort((a, b) =>
      this.sortOrder ? b.score - a.score : a.score - b.score
    );
  }

  ngOnDestroy(): void {
    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe();
    }
  }
}
