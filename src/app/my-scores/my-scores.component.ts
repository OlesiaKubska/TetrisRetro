import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScoresService } from '../scores.service';
import { PlayerDataService } from '../player-data.service';
import { interval, Subscription } from 'rxjs';
import { Score } from '../definitions';
import { switchMap } from 'rxjs/operators';
// import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-my-scores',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-scores.component.html',
  styleUrl: './my-scores.component.scss',
})
export class MyScoresComponent implements OnInit {
  myScores: Score[] = [];
  sortOrder: 'asc' | 'desc' = 'asc';
  playerName: string = '';
  authCode: string = '';
  // @Input() game: string = 'tetris';
  // myScores: Score[] = [];
  // sortOrder: boolean = true;
  // private updateSubscription!: Subscription;

  constructor(
    private _scoresService: ScoresService,
    private _playerDataService: PlayerDataService
  ) {}

  ngOnInit(): void {
    const playerData = this._playerDataService.getPlayerData();
    if (playerData) {
      this.playerName = playerData.name;
      this.authCode = playerData.authCode;
      this.loadMyScores();

      interval(30000)
        .pipe(switchMap(async () => this.loadMyScores()))
        .subscribe();
    }
  }

  loadMyScores(): void {
    this._scoresService
      .getMyScores(this.playerName, 'tetris', this.authCode)
      .subscribe({
        next: (scores) => {
          this.myScores = this.sortScores(
            scores.filter((score) => score.name === this.playerName)
          );
        },
        error: (error) => console.error('Error loading scores:', error),
      });
  }

  toggleSortOrder(): void {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.myScores = this.sortScores(this.myScores);
  }

  sortScores(scores: Score[]): Score[] {
    return scores.sort((a, b) => {
      if (this.sortOrder === 'asc') {
        return a.score - b.score;
      } else {
        return b.score - a.score;
      }
    });
  }

  // ngOnDestroy(): void {
  //   if (this.updateSubscription) {
  //     this.updateSubscription.unsubscribe();
  //   }
  // }
}
