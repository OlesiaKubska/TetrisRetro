import {
  Component,
  Input,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { TetrisCoreModule, TetrisCoreComponent } from 'ngx-tetris';

@Component({
  selector: 'app-game-page',
  standalone: true,
  imports: [TetrisCoreModule],
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.scss',
})
export class GamePageComponent {
  @Input() playerName: string = '';
  @ViewChild('game') game!: TetrisCoreComponent;
  @Output() exitGameEvent = new EventEmitter<void>();

  points: number = 0;

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
    // Логіка для збільшення рахунку гравця
  }

  onGameOver(): void {
    // Логіка, яка виконується, коли гравець програє
  }

  exitGame() {
    this.exitGameEvent.emit();
  }
}
