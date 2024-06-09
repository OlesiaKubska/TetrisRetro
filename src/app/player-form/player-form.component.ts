import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
export class PlayerFormComponent implements OnInit {
  @Output() startGame = new EventEmitter<{
    playerName: string;
    authCode: string;
    color: string;
    studentId: string;
  }>();

  colors = ['normal', 'high-contrast'];
  selectedColor: string = 'normal';

  private fb = new FormBuilder();

  playerForm: FormGroup = this.fb.group({
    playerName: ['', [Validators.required, Validators.minLength(5)]],
    authCode: ['', [Validators.required, Validators.minLength(5)]],
    color: ['normal', Validators.required],
    studentId: ['', Validators.required],
  });

  ngOnInit(): void {
    const savedPlayerName = localStorage.getItem('playerName');
    const savedColor = localStorage.getItem('color') || 'normal';
    if (savedPlayerName) {
      this.playerForm.patchValue({ playerName: savedPlayerName });
    }
    this.playerForm.patchValue({ color: savedColor });
  }

  onSubmit(): void {
    if (this.playerForm.valid) {
      this.startGame.emit(this.playerForm.value);
    }
  }

  onColorChange(): void {
    this.selectedColor = this.playerForm.get('color')?.value;
  }
}
