import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PlayerDataService {
  private playerNameKey = 'playerName';
  private authCodeKey = 'authCode';

  setPlayerData(playerName: string, authCode: string): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem(this.playerNameKey, playerName);
      localStorage.setItem(this.authCodeKey, authCode);
      console.log('Token set:', authCode);
    }
  }

  getPlayerData(): { name: string; authCode: string } | null {
    if (this.isLocalStorageAvailable()) {
      const name = localStorage.getItem(this.playerNameKey);
      const authCode = localStorage.getItem(this.authCodeKey);
      if (name && authCode) {
        return { name, authCode };
      }
    }
    return null;
  }

  getPlayerName(): string | null {
    if (this.isLocalStorageAvailable()) {
      return localStorage.getItem(this.playerNameKey);
    }
    return null;
  }

  getStudentToken(): string | null {
    if (this.isLocalStorageAvailable()) {
      const token = localStorage.getItem(this.authCodeKey);
      console.log('Retrieved token:', token);
      return token;
    }
    return null;
  }

  clearPlayerData(): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem(this.playerNameKey);
      localStorage.removeItem(this.authCodeKey);
    }
  }

  hasPlayerData(): boolean {
    return !!this.getPlayerName() && !!this.getStudentToken();
  }

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
}
