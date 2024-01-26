import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { GameHistoryEntry } from '../game-page/models';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-history-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './history-modal.component.html',
  styleUrl: './history-modal.component.scss',
})
export class HistoryModalComponent {
  @Input() history: any[] = [];
  @Input() isVisible: boolean = false;

  selectedFilter: string = 'all';

  get filteredHistory() {
    if (this.selectedFilter === 'all') {
      return this.history;
    }
    return this.history.filter(
      (entry) => entry.actionName === this.selectedFilter
    );
  }

  sortByTimestamp() {
    this.history = [...this.history].reverse();
  }

  close() {
    this.isVisible = false;
  }
}
