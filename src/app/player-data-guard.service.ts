import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { PlayerDataService } from './player-data.service';

@Injectable({
  providedIn: 'root',
})
export class playerDataGuard implements CanActivate {
  constructor(
    private playerDataService: PlayerDataService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.playerDataService.hasPlayerData()) {
      return true;
    } else {
      this.router.navigate(['/intro']);
      return false;
    }
  }
  // const playerDataService = inject(PlayerDataService);
  // const router = inject(Router);

  // if (playerDataService.hasPlayerData()) {
  //   return true;
  // } else {
  //   router.navigate(['/intro']);
  //   return false;
  // }
}
