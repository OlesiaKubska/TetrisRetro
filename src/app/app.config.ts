import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { IntroPageComponent } from './intro-page/intro-page.component';
import { GamePageComponent } from './game-page/game-page.component';
import { playerDataGuard } from './player-data-guard.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([
      { path: 'intro', component: IntroPageComponent },
      {
        path: 'game/:colors',
        component: GamePageComponent,
        canActivate: [playerDataGuard],
      },
      { path: '**', redirectTo: 'intro' },
    ]),
    provideHttpClient(),
  ],
};
