import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AdquisicionesService } from '../../services/adquisiciones.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editar-adquisicion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './editar-adquisicion.component.html',
  styleUrls: ['./editar-adquisicion.component.css']
})
export class EditarAdquisicionComponent implements OnInit {
  adquisicionForm: FormGroup;
  id!: number;

  mensajeExito: boolean = false;
  strmensajeExito: string = "";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
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

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.adquisicionesService.getAdquisicionById(this.id).subscribe(data => {
      if (data) {
        debugger;
        const formData = {
          monto: data.Presupuesto,
          categoria: data.Unidad,
          descripcion: data.TipoBienServicio,
          cantidad: data.Cantidad,
          costoUnidad: data.ValorUnitario,
          costoTotal: data.ValorTotal,
          fecha: data.FechaAdquisicion,
          proveedor: data.Proveedor,
          factura: data.Documentacion
        };

        this.adquisicionForm.patchValue(formData);
      }
    });
  }


  // initForm(): void {
  //   this.adquisicionForm = this.fb.group({
  //     monto: [null, [Validators.required, Validators.min(1)]],
  //     categoria: ['', Validators.required],
  //     descripcion: ['', Validators.required],
  //     cantidad: [null, [Validators.required, Validators.min(1)]],
  //     costoUnidad: [null, [Validators.required, Validators.min(0)]],
  //     costoTotal: [null, [Validators.required, Validators.min(0)]],
  //     fecha: [null, Validators.required],
  //     proveedor: ['', Validators.required],
  //     factura: ['', Validators.required]
  //   });
  // }


  guardarCambios(): void {
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

      this.adquisicionesService.updateAdquisicion(this.id, datosAEnviar).subscribe(() => {

        this.mensajeExito = true;
        this.strmensajeExito = "Adquisición actualizada exitosamente";
        // Ocultar mensaje después de 3 segundos
        setTimeout(() => {
          this.router.navigate(['/visualizar']); // Redirige a la lista de adquisiciones
        }, 3000);
      });
    } else {
      console.error('Formulario inválido');
    }
  }
}
