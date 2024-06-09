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

  onStartGame(data: {
    playerName: string;
    authCode: string;
    color: string;
    studentId: string;
  }) {
    this._tokenValidationService.validateToken(data.studentId).subscribe({
      next: (response) => {
        if (response.success) {
          this._playerDataService.setPlayerData(data.playerName, data.authCode);
          localStorage.setItem('playerName', data.playerName);
          localStorage.setItem('color', data.color);
          this._router.navigate(['/game', { colors: data.color }]);
        } else {
          alert('Invalid Student ID');
        }
      },
      error: (error) => {
        console.error('Token validation failed', error);
        alert('Error validating Student ID');
      },
    });
  }
}
