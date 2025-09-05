import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { WellManager } from "./components/oil-well/well-manager/well-manager";

interface Well {
  id: number;
  name: string;
  location: string;
  status: 'Activo' | 'Inactivo';
  production: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CardModule, TableModule, TagModule, CommonModule, WellManager],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Oil Well Manager');

  wells: Well[] = [
    { id: 1, name: 'Pozo A', location: 'Amazonas', status: 'Activo', production: 1200 },
    { id: 2, name: 'Pozo B', location: 'Oriente', status: 'Inactivo', production: 0 },
    { id: 3, name: 'Pozo C', location: 'Costa', status: 'Activo', production: 800 },
  ];

  get activeWells() {
    return this.wells.filter(w => w.status === 'Activo').length;
  }

  get inactiveWells() {
    return this.wells.filter(w => w.status === 'Inactivo').length;
  }

  get totalProduction() {
    return this.wells.reduce((sum, w) => sum + w.production, 0);
  }
}
