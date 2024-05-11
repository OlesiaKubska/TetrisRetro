import { Component } from '@angular/core';
import { IntroPageComponent } from './intro-page/intro-page.component';
import { GamePageComponent } from './game-page/game-page.component';
import { TetrisCoreModule } from 'ngx-tetris';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    TetrisCoreModule,
    IntroPageComponent,
    GamePageComponent,
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Tetris-Retro';
  gameStarted: boolean = false;
  playerName: string = '';

  startTheGame(data: { name: string; email: string }) {
    this.playerName = data.name;
    this.gameStarted = true;
  }

  handleExitGame() {
    this.gameStarted = false;
  }
}
