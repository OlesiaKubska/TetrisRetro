import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PlayerDataService {
  private playerName: string = '';
  private playerEmail: string = '';

  constructor() {}

  setPlayerData(name: string, email: string): void {
    this.playerName = name;
    this.playerEmail = email;
  }

  getPlayerName(): string {
    return this.playerName;
  }

  getPlayerEmail(): string {
    return this.playerEmail;
  }
}
