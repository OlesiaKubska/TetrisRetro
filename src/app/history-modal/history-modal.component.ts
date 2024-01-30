import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from './filter.pipe';

@Component({
  selector: 'app-history-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, FilterPipe],
  templateUrl: './history-modal.component.html',
  styleUrl: './history-modal.component.scss',
})
export class HistoryModalComponent {
  @Input() history: any[] = [];
  @Output() closeModal = new EventEmitter<void>();

  public selectedFilter = 'all';

  close() {
    this.closeModal.emit();
  }
}
