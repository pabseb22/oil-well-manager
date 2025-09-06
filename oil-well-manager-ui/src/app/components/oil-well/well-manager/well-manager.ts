import { ChangeDetectorRef, Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ProductionUnitPipe } from '../../../pipes/production-unit.pipe';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Well } from '../../../models/Well';
import { WellManagerService } from '../../../services/well-manager';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { WellStatusHighlightDirective } from '../../../directives/well-status-highlight.directive';

@Component({
  selector: 'app-well-manager',
  imports: [
    CommonModule,
    ButtonModule,
    CardModule,
    TableModule,
    TagModule,
    DialogModule,
    InputTextModule,
    CheckboxModule,
    ReactiveFormsModule,
    ProgressSpinnerModule,
    ProductionUnitPipe,
    WellStatusHighlightDirective,
    ToastModule
  ],
  providers: [WellManagerService, MessageService],
  templateUrl: './well-manager.html',
  styleUrl: './well-manager.scss'
})
export class WellManager {
  wells: Well[] = [];
  loading: boolean = false;
  showDialog: boolean = false;
  wellForm: FormGroup;

  constructor(
    private wellService: WellManagerService,
    private cd: ChangeDetectorRef,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {
    this.wellForm = this.fb.group({
      name: ['', Validators.required],
      location: [''],
      daily_production: [null],
      status: [true, Validators.required] // true means 'activo', false means 'inactivo'
    });
  }

  ngOnInit(): void {
    this.loadWells();
  }

  loadWells() {
    this.loading = true;
    this.wellService.getAllWells().subscribe({
      next: (data) => {
        this.wells = data;
        this.loading = false;
        this.cd.detectChanges();
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  toggleStatus(well: Well) {
    const newStatus = well.status === 'activo' ? 'inactivo' : 'activo';
    this.wellService.updateWellStatus(well.id, newStatus).subscribe(() => {
      setTimeout(() => {
        this.loadWells();
        this.cd.detectChanges();
        this.messageService.add({severity:'success', summary:'Actualización exitosa', detail:`El estado del pozo fue actualizado a ${newStatus}.`});
      });
    });
  }

  openDialog() {
    this.showDialog = true;
    this.wellForm.reset({
      name: '',
      location: '',
      daily_production: null,
      status: true
    });
  }

  closeDialog() {
    this.showDialog = false;
  }

  createWell() {
    if (this.wellForm.valid) {
      this.loading = true;
      const formValue = this.wellForm.value;
      const wellPayload = new Well({
        name: formValue.name,
        location: formValue.location,
        daily_production: formValue.daily_production ? Number(formValue.daily_production) : 0,
        status: formValue.status ? 'activo' : 'inactivo'
      });
      this.wellService.createWell(wellPayload).subscribe({
        next: () => {
          this.loadWells();
          this.closeDialog();
          this.messageService.add({severity:'success', summary:'Pozo creado', detail:'El pozo fue creado exitosamente.'});
        },
        error: () => {
          this.loading = false;
        }
      });
    } else {
      this.wellForm.markAllAsTouched();
    }
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

  get wellsCount(): number {
    return this.wells.length;
  }

  get activeWellsPercent(): number {
    return this.wellsCount ? Math.round((this.activeWellsCount / this.wellsCount) * 100) : 0;
  }

  get inactiveWellsPercent(): number {
    return this.wellsCount ? Math.round((this.inactiveWellsCount / this.wellsCount) * 100) : 0;
  }

  get activeTotalProduction(): number {
    return this.wells.filter(w => w.status === 'activo').reduce((acc, w) => acc + (w.daily_production || 0), 0);
  }
}
