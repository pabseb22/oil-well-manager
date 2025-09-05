import { ChangeDetectorRef, Component } from '@angular/core';
import { Well } from '../../../models/Well';
import { WellManagerService } from '../../../services/well-manager';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-well-manager',
  imports: [CommonModule, ButtonModule, CardModule, TableModule, TagModule],
  providers: [WellManagerService],
  templateUrl: './well-manager.html',
  styleUrl: './well-manager.scss'
})
export class WellManager {
  wells: Well[] = [];

  constructor(private wellService: WellManagerService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadWells();
  }

  loadWells() {
    this.wellService.getAllWells().subscribe(data => {
      this.wells = data;
      this.cd.detectChanges();
      console.log(this.wells);

    });
  }

  toggleStatus(well: Well) {
    const newStatus = well.status === 'activo' ? 'inactivo' : 'activo';
    console.log("Changed to:", newStatus);

    this.wellService.updateWellStatus(well.id, newStatus)
      .subscribe(() => this.loadWells());
  }


  trackByWell(index: number, well: Well): number {
    return well.id;
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
