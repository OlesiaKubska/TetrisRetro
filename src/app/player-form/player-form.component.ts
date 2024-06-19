import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TokenValidationService } from '../token-validation.service';

@Component({
  selector: 'app-player-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './player-form.component.html',
  styleUrl: './player-form.component.scss',
})
export class PlayerFormComponent {
  @Output() startGame = new EventEmitter<{
    playerName: string;
    authCode: string;
    color: string;
  }>();

  colors = ['normal', 'high-contrast'];
  selectedColor: string = 'normal';
  playerForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private tokenValidationService: TokenValidationService
  ) {
    this.playerForm = this.fb.group({
      playerName: ['', [Validators.required, Validators.minLength(5)]],
      authCode: ['', [Validators.required, Validators.minLength(4)]],
      color: ['normal', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadFormData();
  }

  onSubmit(): void {
    if (this.playerForm.valid) {
      const { playerName, authCode, color } = this.playerForm.value;
      // console.log('Submitting token for validation:', authCode);
      this.isLoading = true;
      this.tokenValidationService.validateToken(authCode).subscribe({
        next: (response) => {
          this.isLoading = false;
          // console.log('Token validation response:', response);
          if (response.success) {
            this.startGame.emit({ playerName, authCode, color });
            this.saveFormData(playerName, color);
          } else {
            this.errorMessage = 'Invalid token. Please try again.';
          }
        },
        error: (error) => {
          this.isLoading = false;
          console.error('Token validation error:', error);
          this.errorMessage = 'Error validating token. Please try again later.';
        },
      });
    } else {
      this.playerForm.markAllAsTouched();
    }
  }

  onColorChange(): void {
    this.selectedColor = this.playerForm.get('color')?.value;
    const someElement = document.getElementById('color-sensitive-element');
    if (someElement) {
      someElement.style.filter =
        this.selectedColor === 'high-contrast'
          ? 'grayscale(0)'
          : 'grayscale(100%)';
    }
  }

  get playerName() {
    return this.playerForm.get('playerName');
  }

  get authCode() {
    return this.playerForm.get('authCode');
  }

  private loadFormData(): void {
    if (this.isLocalStorageAvailable()) {
      const savedPlayerName = localStorage.getItem('playerName');
      const savedColor = localStorage.getItem('color') || 'normal';
      if (savedPlayerName) {
        this.playerForm.patchValue({ playerName: savedPlayerName });
      }
      this.playerForm.patchValue({ color: savedColor });
      this.onColorChange();
    }
  }

  private saveFormData(playerName: string, color: string): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('playerName', playerName);
      localStorage.setItem('color', color);
    }
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
