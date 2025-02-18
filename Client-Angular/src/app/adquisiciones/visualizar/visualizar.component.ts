import { Component, OnInit } from '@angular/core';
import { AdquisicionesService } from '../../services/adquisiciones.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-visualizar',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, RouterLink],
  templateUrl: './visualizar.component.html',
  styleUrls: ['./visualizar.component.css']
})

export class VisualizarComponent implements OnInit {
  adquisiciones: any[] = [];
  mensajeExito: boolean = false;
  strmensajeExito: string = "";
  eliminados: number[] = []; // Almacena IDs de adquisiciones seleccionadas
  adquisicionesFiltradas: any[] = [];


  // Definir los filtros para cada columna
  filtros = {
    presupuesto: '',
    unidad: '',
    tipoBienServicio: '',
    cantidad: '',
    valorUnitario: '',
    valorTotal: '',
    fecha: '',
    proveedor: '',
    documentacion: ''
  };

  constructor(private adquisicionesService: AdquisicionesService) { }

  ngOnInit(): void {
    this.cargarAdquisiciones();
  }

  trackById(index: number, item: any): number {
    return item.id;
  }

  aplicarFiltros() {
    this.adquisicionesFiltradas = this.adquisiciones.filter(item =>
      (this.filtros.presupuesto.trim() === '' || item.Presupuesto?.toString().toLowerCase().includes(this.filtros.presupuesto.trim().toLowerCase())) &&
      (this.filtros.unidad.trim() === '' || item.Unidad?.toString().toLowerCase().includes(this.filtros.unidad.trim().toLowerCase())) &&
      (this.filtros.tipoBienServicio.trim() === '' || item.TipoBienServicio?.toString().toLowerCase().includes(this.filtros.tipoBienServicio.trim().toLowerCase())) &&
      (this.filtros.cantidad.trim() === '' || String(item.Cantidad)?.toLowerCase().includes(this.filtros.cantidad.trim().toLowerCase())) &&
      (this.filtros.valorUnitario.trim() === '' || String(item.ValorUnitario)?.toLowerCase().includes(this.filtros.valorUnitario.trim().toLowerCase())) &&
      (this.filtros.valorTotal.trim() === '' || String(item.ValorTotal)?.toLowerCase().includes(this.filtros.valorTotal.trim().toLowerCase())) &&
      (this.filtros.fecha.trim() === '' || item.FechaAdquisicion?.toString().toLowerCase().includes(this.filtros.fecha.trim().toLowerCase())) &&
      (this.filtros.proveedor.trim() === '' || item.Proveedor?.toString().toLowerCase().includes(this.filtros.proveedor.trim().toLowerCase())) &&
      (this.filtros.documentacion.trim() === '' || item.Documentacion?.toString().toLowerCase().includes(this.filtros.documentacion.trim().toLowerCase()))
    );
  }

  eliminarAdquisicion(index: number) {
    if (confirm("¿Estás seguro de eliminar esta adquisición?")) {
      this.adquisicionesService.deleteAdquisicion(index).subscribe(
        response => {
          console.log('Adquisición eliminada:', response);

          // Mostrar mensaje de éxito
          this.mensajeExito = true;
          this.strmensajeExito = "Adquisición eliminada exitosamente";

          // Asegurar que `eliminados` está definido antes de usarlo
          if (!this.eliminados) {
            this.eliminados = [];
          }

          this.eliminados.push(index); // Guardar ID eliminados para referencia

          // Recargar la lista desde la API para reflejar los cambios
          this.cargarAdquisiciones();

          // Ocultar mensaje después de 3 segundos
          setTimeout(() => {
            this.mensajeExito = false;
          }, 3000);
        },
        error => console.error('Error al eliminar la adquisición:', error)
      );
    }
  }

  // Método para recargar la data después de eliminar
  cargarAdquisiciones() {
    this.adquisicionesService.getAdquisiciones().subscribe(data => {
      console.log('Datos recibidos de la API:', data);
      this.adquisiciones = Array.isArray(data) ? data : [];
      this.adquisicionesFiltradas = [...this.adquisiciones];
    }, error => {
      console.error('Error al obtener adquisiciones:', error);
    });
  }

}
