import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PlayerDataService } from '../player-data.service';
import { PlayerFormComponent } from '../player-form/player-form.component';
import { TokenValidationService } from '../token-validation.service';

@Component({
  selector: 'app-intro-page',
  standalone: true,
  imports: [CommonModule, PlayerFormComponent],
  templateUrl: './intro-page.component.html',
  styleUrl: './intro-page.component.scss',
})
export class IntroPageComponent implements OnInit {
  constructor(
    private _router: Router,
    private _playerDataService: PlayerDataService,
    private _tokenValidationService: TokenValidationService
  ) {}

  ngOnInit(): void {
    this._playerDataService.clearPlayerData();
  }

  onStartGame(data: { playerName: string; authCode: string; color: string }) {
    console.log('Submitting token for validation:', data.authCode);
    this._tokenValidationService.validateToken(data.authCode).subscribe({
      next: (response: { success: boolean }) => {
        console.log('Token validation response:', response);
        if (response && response.success) {
          this._playerDataService.setPlayerData(data.playerName, data.authCode);
          this._router.navigate(['/game', { colors: data.color }]);
        } else {
          alert('Invalid token. Please try again.');
        }
      },
      error: (error) => {
        console.error('Token validation error:', error);
        alert('Error validating token. Please try again later.');
      },
    });
  }
}
