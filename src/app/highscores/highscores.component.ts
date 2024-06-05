import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighscoresService } from '../highscores.service';

@Component({
  selector: 'app-highscores',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './highscores.component.html',
  styleUrl: './highscores.component.scss',
})
export class HighscoresComponent implements OnInit {
  @Input()
  game!: string;
  highscores: any[] = [];
  sortOrder: boolean = true;

  constructor(private highscoresService: HighscoresService) {}

  ngOnInit(): void {
    this.loadHighscores();
  }

  loadHighscores(): void {
    this.highscoresService.getHighscores(this.game).subscribe((scores) => {
      this.highscores = scores;
      this.sortScores();
    });
  }

  toggleSortOrder(): void {
    this.sortOrder = !this.sortOrder;
    this.sortScores();
  }

  sortScores(): void {
    this.highscores.sort((a, b) =>
      this.sortOrder ? b.score - a.score : a.score - b.score
    );
  }
}
