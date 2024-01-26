import {
  Component,
  Input,
  ViewChild,
  Output,
  EventEmitter,
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
    this.addHistoryEntry('Game Stoped');
  }

  public onStartButtonPressed() {
    this.game.actionStart();
    this.addHistoryEntry('Game Started');
  }

  public onResetButtonPressed() {
    this.game.actionReset();
    this.addHistoryEntry('Game Reset');
  }

  public onLeftButtonPressed() {
    this.game.actionLeft();
    this.addHistoryEntry('Moved Left');
  }

  public onRightButtonPressed() {
    this.game.actionRight();
    this.addHistoryEntry('Moved Right');
  }

  public onDownButtonPressed() {
    this.game.actionDown();
    this.addHistoryEntry('Moved Down');
  }

  public onDropButtonPressed() {
    this.game.actionDrop();
    this.addHistoryEntry('Dropped');
  }

  onLineCleared(): void {
    this.points += 100;
    this.addHistoryEntry('Line Cleared');
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

  openHistoryModal() {
    this.isHistoryModalVisible = true;
  }
}
