import {
  Component,
  Input,
  ViewChild,
  Output,
  EventEmitter,
  OnInit,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { interval, Subscription } from 'rxjs';
import { TetrisCoreModule, TetrisCoreComponent } from 'ngx-tetris';
import { GameHistoryEntry } from './models';
import { HistoryModalComponent } from '../history-modal/history-modal.component';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerDataService } from '../player-data.service';
import { HighscoresComponent } from '../highscores/highscores.component';

@Component({
  selector: 'app-game-page',
  standalone: true,
  imports: [
    CommonModule,
    TetrisCoreModule,
    FormsModule,
    HistoryModalComponent,
    HighscoresComponent,
  ],
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.scss',
})
export class GamePageComponent implements OnInit {
  @Input() playerName: string = '';
  @Input() studentToken: string = '';
  @ViewChild('game') game!: TetrisCoreComponent;
  @Output() exitGameEvent = new EventEmitter<void>();

  points: number = 0;
  time: number = 0;
  private timerSubscription!: Subscription;
  showModal: boolean = false;
  gameHistory: GameHistoryEntry[] = [];
  showHighscoresModal: boolean = false;
  highContrast: boolean = false;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _playerDataService: PlayerDataService
  ) {}

  ngOnInit(): void {
    this.timerSubscription = interval(1000).subscribe(() => this.time++);
    this.playerName = this._playerDataService.getPlayerName();
    this.studentToken = this._playerDataService.getStudentToken();

    this._route.paramMap.subscribe((params) => {
      const colors = params.get('colors');
      this.highContrast = colors === 'high-contrast';
    });
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
    this._router.navigate(['/intro']);
  }

  addHistoryEntry(actionName: string) {
    this.gameHistory.push({ timestamp: new Date(), actionName: actionName });
  }

  openHistoryModal() {
    this.showModal = true;
  }

  onModalClose() {
    this.showModal = false;
  }

  openHighscoresModal() {
    this.showHighscoresModal = true;
  }

  onHighscoresModalClose() {
    this.showHighscoresModal = false;
  }

  switchColorPalette(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const palette = selectElement.value;
    this._router.navigate(['/game', palette]);
  }
}
