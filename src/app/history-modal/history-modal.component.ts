import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-history-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './history-modal.component.html',
  styleUrl: './history-modal.component.scss',
})
export class HistoryModalComponent {
  @Input() history: any[] = [];
  @Input() isVisible: boolean = false;

  close() {
    this.isVisible = false;
  }
}
