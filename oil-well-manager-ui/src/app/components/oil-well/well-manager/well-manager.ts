import { Component } from '@angular/core';
import { Well } from '../../../models/Well';
import { WellManagerService } from '../../../services/well-manager';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-well-manager',
  imports: [CommonModule],
  providers: [WellManagerService],
  templateUrl: './well-manager.html',
  styleUrl: './well-manager.scss'
})
export class WellManager {
  wells: Well[] = [];

  constructor(private wellService: WellManagerService) { }

  ngOnInit(): void {
    this.loadWells();
  }

  loadWells() {
    this.wellService.getAllWells().subscribe(data => this.wells = data);
  }

  toggleStatus(well: Well) {
    const newStatus = well.status === 'activo' ? 'inactivo' : 'activo';
    this.wellService.updateWellStatus(well.id, newStatus).subscribe(() => this.loadWells());
  }

  get activeWellsCount(): number {
    return this.wells.filter(w => w.status === 'activo').length;
  }

  get inactiveWellsCount(): number {
    return this.wells.filter(w => w.status === 'inactivo').length;
  }

  get totalProduction(): number {
    return this.wells.reduce((acc, w) => acc + (w.daily_production || 0), 0);
  }
}
