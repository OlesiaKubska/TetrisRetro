import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PlayerDataService } from '../player-data.service';
import { TokenValidationService } from '../token-validation.service';

@Component({
  selector: 'app-intro-page',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './intro-page.component.html',
  styleUrl: './intro-page.component.scss',
})
export class IntroPageComponent implements OnInit {
  playerName: string = '';
  studentToken: string = '';
  errorMessage: string = '';
  colorPalette: string = 'normal';

  constructor(
    private _router: Router,
    private _playerDataService: PlayerDataService,
    private _tokenValidationService: TokenValidationService
  ) {}

  @Output() startGame = new EventEmitter<{ name: string; token: string }>();

  ngOnInit(): void {
    this._playerDataService.clearPlayerData();
  }

  onSubmit(): void {
    if (this.playerName.trim() !== '' && this.studentToken.trim() !== '') {
      this._tokenValidationService.validateToken(this.studentToken).subscribe({
        next: (response) => {
          if (response.success) {
            this._playerDataService.setPlayerData(
              this.playerName,
              this.studentToken
            );
            this.startGame.emit({
              name: this.playerName,
              token: this.studentToken,
            });
            this._router.navigate(['/game', this.colorPalette]);
          } else {
            this.errorMessage =
              'Invalid token. Please enter a valid student ID.';
          }
        },
        error: (error) => {
          console.error('Token validation failed:', error);
          this.errorMessage =
            'An error occurred during token validation. Please try again.';
        },
      });
    } else {
      console.log('Form is not valid');
    }
  }
}
