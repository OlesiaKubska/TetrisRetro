import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { PlayerDataService } from '../player-data.service';
// import { TokenValidationService } from '../token-validation.service';

@Component({
  selector: 'app-intro-page',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './intro-page.component.html',
  styleUrl: './intro-page.component.scss',
})
export class IntroPageComponent implements OnInit {
  introForm: FormGroup;
  colors = ['normal', 'high-contrast'];
  selectedColor: string = 'normal';

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _playerDataService: PlayerDataService
  ) {
    this.introForm = this._fb.group({
      playerName: ['', [Validators.required, Validators.minLength(5)]],
      authCode: ['', [Validators.required, Validators.minLength(5)]],
      color: ['normal', Validators.required],
    });
  }

  ngOnInit(): void {
    this._playerDataService.clearPlayerData();
    if (this.isLocalStorageAvailable()) {
      const savedPlayerName = localStorage.getItem('playerName');
      const savedColor = localStorage.getItem('color') || 'normal';
      if (savedPlayerName) {
        this.introForm.patchValue({ playerName: savedPlayerName });
      }
      this.introForm.patchValue({ color: savedColor });
    }
  }

  onSubmit(): void {
    if (this.introForm.valid) {
      const { playerName, authCode, color } = this.introForm.value;
      this._playerDataService.setPlayerData(playerName, authCode);
      if (this.isLocalStorageAvailable()) {
        localStorage.setItem('playerName', playerName);
        localStorage.setItem('color', color);
      }
      this._router.navigate(['/game', { colors: color }]);
    }
  }

  onColorChange(): void {
    this.selectedColor = this.introForm.get('color')?.value;
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
// export class IntroPageComponent implements OnInit {
//   playerName: string = '';
//   studentToken: string = '';
//   errorMessage: string = '';
//   colorPalette: string = 'normal';

//   constructor(
//     private _router: Router,
//     private _playerDataService: PlayerDataService,
//     private _tokenValidationService: TokenValidationService
//   ) {}

//   @Output() startGame = new EventEmitter<{ name: string; token: string }>();

//   ngOnInit(): void {
//     this._playerDataService.clearPlayerData();
//   }

//   onSubmit(): void {
//     if (this.playerName.trim() !== '' && this.studentToken.trim() !== '') {
//       this._tokenValidationService.validateToken(this.studentToken).subscribe({
//         next: (response) => {
//           if (response.success) {
//             this._playerDataService.setPlayerData(
//               this.playerName,
//               this.studentToken
//             );
//             this.startGame.emit({
//               name: this.playerName,
//               token: this.studentToken,
//             });
//             this._router.navigate(['/game', this.colorPalette]);
//           } else {
//             this.errorMessage =
//               'Invalid token. Please enter a valid student ID.';
//           }
//         },
//         error: (error) => {
//           console.error('Token validation failed:', error);
//           this.errorMessage =
//             'An error occurred during token validation. Please try again.';
//         },
//       });
//     } else {
//       console.log('Form is not valid');
//     }
//   }
// }
