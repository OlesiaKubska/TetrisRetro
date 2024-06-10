import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

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

  constructor(private fb: FormBuilder) {
    this.playerForm = this.fb.group({
      playerName: ['', [Validators.required, Validators.minLength(5)]],
      authCode: ['', [Validators.required, Validators.minLength(5)]],
      color: ['normal', Validators.required],
    });
  }

  ngOnInit(): void {
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

  onSubmit(): void {
    if (this.playerForm.valid) {
      const { playerName, authCode, color } = this.playerForm.value;
      console.log('Submitting token for validation:', authCode);
      this.startGame.emit({ playerName, authCode, color });
      if (this.isLocalStorageAvailable()) {
        localStorage.setItem('playerName', playerName);
        localStorage.setItem('color', color);
      }
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
