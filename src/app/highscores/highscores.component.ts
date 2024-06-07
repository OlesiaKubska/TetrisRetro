import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  OnChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighscoresService } from '../highscores.service';

@Component({
  selector: 'app-highscores',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './highscores.component.html',
  styleUrl: './highscores.component.scss',
})
export class HighscoresComponent implements OnInit, OnChanges {
  @Input() game!: string;
  @Output() closeModal = new EventEmitter<void>();
  highscores: any[] = [];
  sortOrder: boolean = true;

  constructor(private _highscoresService: HighscoresService) {}

  ngOnInit(): void {
    if (this.game) {
      this.loadHighscores();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['game'] && changes['game'].currentValue) {
      this.loadHighscores();
    }
  }

  loadHighscores(): void {
    this._highscoresService.getHighscores(this.game).subscribe({
      next: (scores) => {
        console.log('Received scores:', scores);
        if (Array.isArray(scores)) {
          this.highscores = this.sortScores(scores);
        } else {
          console.error('Received data is not an array', scores);
        }
      },
      error: (error) => console.error('Failed to load highscores:', error),
    });
  }

  toggleSortOrder(): void {
    this.sortOrder = !this.sortOrder;
    this.highscores = this.sortScores(this.highscores);
  }

  private sortScores(scores: any[]): any[] {
    return scores
      .sort((a, b) => (this.sortOrder ? b.score - a.score : a.score - b.score))
      .slice(0, 10);
  }

  close() {
    this.closeModal.emit();
  }
}
