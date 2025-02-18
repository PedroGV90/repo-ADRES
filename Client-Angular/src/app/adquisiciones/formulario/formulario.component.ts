import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AdquisicionesService } from '../../services/adquisiciones.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {
  mensajeExito: boolean = false;
  strmensajeExito: string = "";
  adquisicionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private adquisicionesService: AdquisicionesService
  ) {
    this.adquisicionForm = this.fb.group({
      monto: [null, [Validators.required, Validators.min(1)]],
      categoria: ['', Validators.required],
      descripcion: ['', Validators.required],
      cantidad: [null, [Validators.required, Validators.min(1)]],
      costoUnidad: [null, [Validators.required, Validators.min(0)]],
      costoTotal: [null, [Validators.required, Validators.min(0)]],
      fecha: [null, Validators.required],
      proveedor: ['', Validators.required],
      factura: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.AlmacenarDatos();
  }

  AlmacenarDatos(): void {
    if (this.adquisicionForm.valid) {
      const datosAEnviar = {  // <-- Mover dentro del método
        Presupuesto: this.adquisicionForm.value.monto,
        Unidad: this.adquisicionForm.value.categoria,
        TipoBienServicio: this.adquisicionForm.value.descripcion,
        Cantidad: this.adquisicionForm.value.cantidad,
        ValorUnitario: this.adquisicionForm.value.costoUnidad,
        ValorTotal: this.adquisicionForm.value.costoTotal,
        FechaAdquisicion: this.adquisicionForm.value.fecha,
        Proveedor: this.adquisicionForm.value.proveedor,
        Documentacion: this.adquisicionForm.value.factura
      };

      console.log('Valores del formulario:', this.adquisicionForm.value);
      console.log('Datos enviados al backend:', datosAEnviar);

      this.adquisicionesService.createAdquisicion(datosAEnviar).subscribe(
        response => {
          console.log('Adquisición creada:', response);
          this.mensajeExito = true;
          this.strmensajeExito = "Adquisición creada exitosamente";

          setTimeout(() => {
            this.mensajeExito = false;
            this.adquisicionForm.reset();
          }, 3000);
        },
        error => console.error('Error al crear la adquisición:', error)
      );
    } else {
      console.error('Formulario inválido');
    }
  }
}
