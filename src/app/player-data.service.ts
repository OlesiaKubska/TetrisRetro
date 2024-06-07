import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PlayerDataService {
  private playerName: string = '';
  private studentToken: string = '';

  constructor() {}

  setPlayerData(name: string, token: string): void {
    this.playerName = name;
    this.studentToken = token;
  }

  getPlayerName(): string {
    return this.playerName;
  }

  getStudentToken(): string {
    return this.studentToken;
  }
}
