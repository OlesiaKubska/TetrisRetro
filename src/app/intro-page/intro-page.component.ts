import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PlayerDataService } from '../player-data.service';
import { PlayerFormComponent } from '../player-form/player-form.component';

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
    private _playerDataService: PlayerDataService
  ) {}

  ngOnInit(): void {
    this._playerDataService.clearPlayerData();
  }

  onStartGame(data: { playerName: string; authCode: string; color: string }) {
    this._playerDataService.setPlayerData(data.playerName, data.authCode);
    this._router.navigate(['/game', { colors: data.color }]);
  }
}
