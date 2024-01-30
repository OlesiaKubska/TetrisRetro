import { Pipe, PipeTransform } from '@angular/core';
import { GameHistoryEntry } from '../game-page/models';

@Pipe({
  name: 'filter',
  standalone: true,
})
export class FilterPipe implements PipeTransform {
  transform(values: Array<GameHistoryEntry>, actionName: string): Array<any> {
    if (!actionName || actionName === 'all') {
      return values;
    }
    return values.filter((history) => history.actionName === actionName);
  }
}
