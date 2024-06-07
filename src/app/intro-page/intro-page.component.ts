import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PlayerDataService } from '../player-data.service';

@Component({
  selector: 'app-intro-page',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './intro-page.component.html',
  styleUrl: './intro-page.component.scss',
})
export class IntroPageComponent {
  playerName: string = '';
  studentToken: string = '';

  constructor(
    private _router: Router,
    private _playerDataService: PlayerDataService
  ) {}

  @Output() startGame = new EventEmitter<{ name: string; email: string }>();

  validateEmail(email: string): boolean {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  onSubmit(): void {
    if (this.playerName.trim() !== '' && this.studentToken.trim() !== '') {
      this._playerDataService.setPlayerData(this.playerName, this.studentToken);
      this.startGame.emit({ name: this.playerName, email: this.studentToken });
      this._router.navigate(['/game']);
    } else {
      console.log('Form is not valid');
    }
  }
}
