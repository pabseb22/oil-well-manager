import { Component, signal } from '@angular/core';

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
  imports: [WellManager],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Oil Well Manager');

  
}
