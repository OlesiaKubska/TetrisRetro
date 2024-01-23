import { Component, Input, ViewChild } from '@angular/core';
import { TetrisCoreModule } from 'ngx-tetris';

@Component({
  selector: 'app-game-page',
  standalone: true,
  imports: [TetrisCoreModule],
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.scss',
})
export class GamePageComponent {
  @Input() playerName: string = '';
  @ViewChild('game') game: any;

  points: number = 0;

  onLineCleared(): void {
    // Логіка для збільшення рахунку гравця
  }

  onGameOver(): void {
    // Логіка, яка виконується, коли гравець програє
  }
}
