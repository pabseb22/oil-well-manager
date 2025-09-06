import { Component, signal } from '@angular/core';
import { ImageModule } from 'primeng/image';
import { WellManager } from "./components/oil-well/well-manager/well-manager";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [WellManager, ImageModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Oil Well Manager');

  
}
