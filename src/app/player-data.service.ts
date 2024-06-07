import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PlayerDataService {
  private playerNameKey = 'playerName';
  private studentTokenKey = 'studentToken';

  // constructor() {}

  private isLocalStorageAvailable(): boolean {
    try {
      const test = 'test';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  setPlayerData(playerName: string, studentToken: string): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem(this.playerNameKey, playerName);
      localStorage.setItem(this.studentTokenKey, studentToken);
    }
  }

  getPlayerName(): string | null {
    if (this.isLocalStorageAvailable()) {
      return localStorage.getItem(this.playerNameKey);
    }
    return null;
  }

  getStudentToken(): string | null {
    if (this.isLocalStorageAvailable()) {
      return localStorage.getItem(this.studentTokenKey);
    }
    return null;
  }

  clearPlayerData(): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem(this.playerNameKey);
      localStorage.removeItem(this.studentTokenKey);
    }
  }

  hasPlayerData(): boolean {
    return !!this.getPlayerName() && !!this.getStudentToken();
  }
}
