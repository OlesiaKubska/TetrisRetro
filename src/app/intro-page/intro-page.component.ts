import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-intro-page',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './intro-page.component.html',
  styleUrl: './intro-page.component.scss',
})
export class IntroPageComponent {
  playerName: string = '';
  playerEmail: string = '';

  constructor(private router: Router) {}

  @Output() startGame = new EventEmitter<{ name: string; email: string }>();

  validateEmail(email: string): boolean {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  onSubmit() {
    if (this.playerName.trim() !== '' && this.validateEmail(this.playerEmail)) {
      this.startGame.emit({ name: this.playerName, email: this.playerEmail });
      this.router.navigate(['/game']);
    } else {
      console.log('Form is not valid');
    }
  }
}
