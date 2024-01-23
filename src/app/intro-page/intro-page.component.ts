import { Component, EventEmitter, Output } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-intro-page',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './intro-page.component.html',
  styleUrl: './intro-page.component.scss',
})
export class IntroPageComponent {
  playerName: string = '';
  playerEmail: string = '';
  formValid: boolean = false;

  // Використовуйте Output, щоб створити власну подію, яку можна буде "послухати" в батьківському компоненті
  @Output() startGame = new EventEmitter<{ name: string; email: string }>();

  validateForm() {
    this.formValid =
      this.playerName.trim() !== '' && this.validateEmail(this.playerEmail);
  }

  validateEmail(email: string): boolean {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  onSubmit() {
    if (this.formValid) {
      // Тут можна зберегти дані гравця та перейти до сторінки гри
      console.log(
        `Player Name: ${this.playerName}, Player Email: ${this.playerEmail}`
      );
      // Реалізуйте перехід до сторінки гри
      this.startGame.emit({ name: this.playerName, email: this.playerEmail });
    } else {
      // Показати помилку або повідомлення
      console.log('Form is not valid');
    }
  }
}
