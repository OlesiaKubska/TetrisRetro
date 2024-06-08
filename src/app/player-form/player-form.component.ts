import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  private fb = new FormBuilder();

  playerForm: FormGroup = this.fb.group({
    playerName: ['', [Validators.required, Validators.minLength(5)]],
    authCode: ['', [Validators.required, Validators.minLength(5)]],
    color: ['normal', Validators.required],
  });

  onSubmit(): void {
    if (this.playerForm.valid) {
      this.startGame.emit(this.playerForm.value);
    }
  }

  onColorChange(): void {
    this.selectedColor = this.playerForm.get('color')?.value;
  }
}
