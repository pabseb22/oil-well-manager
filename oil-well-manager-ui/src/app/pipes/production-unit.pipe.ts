import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productionUnit',
  standalone: true
})
export class ProductionUnitPipe implements PipeTransform {
  // 1 barril = 42 galones (US), 1 barril = 159 litros
  transform(value: number, unit: 'bbl' | 'gal' | 'L' = 'bbl'): string {
    if (value == null) return '';
    let converted = value;
    let suffix = 'bbl';
    switch (unit) {
      case 'gal':
        converted = value * 42;
        suffix = 'gal';
        break;
      case 'L':
        converted = value * 159;
        suffix = 'L';
        break;
      default:
        converted = value;
        suffix = 'bbl';
    }
    return `${converted.toLocaleString(undefined, { maximumFractionDigits: 2 })} ${suffix}`;
  }
}
