import {
  Component,
  Input,
  ViewChild,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { interval, Subscription } from 'rxjs';
import { TetrisCoreModule, TetrisCoreComponent } from 'ngx-tetris';
import { GameHistoryEntry } from './models';
import { HistoryModalComponent } from '../history-modal/history-modal.component';

@Component({
  selector: 'app-game-page',
  standalone: true,
  imports: [CommonModule, TetrisCoreModule, FormsModule, HistoryModalComponent],
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.scss',
})
export class GamePageComponent {
  @Input() playerName: string = '';
  @ViewChild('game') game!: TetrisCoreComponent;
  @Output() exitGameEvent = new EventEmitter<void>();

  points: number = 0;
  time: number = 0;
  private timerSubscription!: Subscription;
  isHistoryModalVisible: boolean = false;
  gameHistory: GameHistoryEntry[] = [];

  ngOnInit(): void {
    this.timerSubscription = interval(1000).subscribe(() => this.time++);
  }

  ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  public onRotateButtonPressed() {
    this.game.actionRotate();
  }

  public onStopButtonPressed() {
    this.game.actionStop();
  }

  public onStartButtonPressed() {
    this.game.actionStart();
  }

  public onResetButtonPressed() {
    this.game.actionReset();
  }

  public onLeftButtonPressed() {
    this.game.actionLeft();
  }

  public onRightButtonPressed() {
    this.game.actionRight();
  }

  public onDownButtonPressed() {
    this.game.actionDown();
  }

  public onDropButtonPressed() {
    this.game.actionDrop();
  }

  onLineCleared(): void {
    this.points += 100;
  }

  onGameOver(): void {
    this.timerSubscription.unsubscribe();
    this.time = 0;
    this.points = 0;
    alert('Game Over! Better luck next time.');
  }

  exitGame() {
    this.time = 0;
    this.points = 0;
    this.exitGameEvent.emit();
  }

  addHistoryEntry(actionName: string) {
    this.gameHistory.push({ timestamp: new Date(), actionName: actionName });
  }

  showHistory() {
    if (this.gameHistory.length === 0) {
      alert('History is empty.');
    } else {
      this.isHistoryModalVisible = true;
    }
  }

  selectedFilter: string = 'all';

  get filteredHistory() {
    if (this.selectedFilter === 'all') {
      return this.gameHistory;
    }
    return this.gameHistory.filter(
      (entry) => entry.actionName === this.selectedFilter
    );
  }
  sortByTimestamp() {
    this.gameHistory = this.gameHistory.slice().reverse();
  }
}
