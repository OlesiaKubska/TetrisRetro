import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PlayerDataService {
  private playerNameKey = 'playerName';
  private studentTokenKey = 'studentToken';

  setPlayerData(playerName: string, studentToken: string): void {
    localStorage.setItem(this.playerNameKey, playerName);
    localStorage.setItem(this.studentTokenKey, studentToken);
  }

  getPlayerName(): string | null {
    return localStorage.getItem(this.playerNameKey);
  }

  getStudentToken(): string | null {
    return localStorage.getItem(this.studentTokenKey);
  }

  clearPlayerData(): void {
    localStorage.removeItem(this.playerNameKey);
    localStorage.removeItem(this.studentTokenKey);
  }

  hasPlayerData(): boolean {
    return !!this.getPlayerName() && !!this.getStudentToken();
  }
}
