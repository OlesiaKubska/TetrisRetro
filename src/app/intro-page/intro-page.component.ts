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
  isLoading = false;
  errorMessage = '';

  constructor(
    private _router: Router,
    private _playerDataService: PlayerDataService,
    private _tokenValidationService: TokenValidationService
  ) {}

  ngOnInit(): void {
    this._playerDataService.clearPlayerData();
  }

  onStartGame(data: { playerName: string; authCode: string; color: string }) {
    this.isLoading = true;
    this.errorMessage = '';
    // console.log('Submitting token for validation:', data.authCode);

    this._tokenValidationService.validateToken(data.authCode).subscribe({
      next: (response) => {
        this.isLoading = false;
        // console.log('Token validation response:', response);

        if (response.success) {
          this._playerDataService.setPlayerData(data.playerName, data.authCode);
          this._router.navigate(['/game', { colors: data.color }]);
        } else {
          this.errorMessage = 'Invalid token. Please try again.';
        }
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Token validation error:', error);
        this.errorMessage = 'Error validating token. Please try again later.';
      },
    });
  }
}
