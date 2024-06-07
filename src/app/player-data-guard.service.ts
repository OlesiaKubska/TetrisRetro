import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PlayerDataService } from './player-data.service';

export const playerDataGuard: CanActivateFn = () => {
  const playerDataService = inject(PlayerDataService);
  const router = inject(Router);

  if (playerDataService.hasPlayerData()) {
    return true;
  } else {
    router.navigate(['/intro']);
    return false;
  }
};
