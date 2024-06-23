import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'oddsColor',
  standalone: true
})
export class OddsColorPipe implements PipeTransform {

  transform(value: string, color: string): string {
    switch (true) {
      case this.isBetween(value, '1', '1,5'):
        return 'color' === color ? 'bg-blue-600' : 'hover:bg-blue-300';
      case this.isBetween(value, '1,5', '2'):
        return 'color' === color ? 'bg-green-600' : 'hover:bg-green-300';
      case this.isBetween(value, '2', '4'):
        return 'color' === color ? 'bg-yellow-400' : 'hover:bg-yellow-200';
      case this.isBetween(value, '4', '6'):
        return 'color' === color ? 'bg-orange-500' : 'hover:bg-orange-300';
      default:
        return 'color' === color ? 'bg-red-600' : 'hover:bg-red-300';
    }
  }

  isBetween(value: string, firstValue: string, lastValue: string): boolean {
    return parseFloat(value) >= parseFloat(firstValue) && parseFloat(value) < parseFloat(lastValue);
  }

}
