import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'; // Importar FormsModule

@Component({
  selector: 'app-cotizador',
  standalone: true,
  templateUrl: './cotizador.component.html',
  styleUrls: ['./cotizador.component.scss'],
  imports: [FormsModule, CommonModule, ReactiveFormsModule]
})
export class CotizadorComponent {
  cotizadorForm: FormGroup;
  largo: number = 0;
  ancho: number = 0;
  alto: number = 0;
  mensaje: string = '';
  costo: number = 0;
  volumen: number = 0;
  numeroOrden: number = 0;
  fecha: string = '';
  hora: string = '';
  showConfirmMsg: boolean = false;
  showErrorMsg: boolean = false;

  constructor(private fb: FormBuilder) {
    this.cotizadorForm = this.fb.group({
      largo: [0, [Validators.required, Validators.min(1)]],
      ancho: [0, [Validators.required, Validators.min(1)]],
      alto: [0, [Validators.required, Validators.min(1)]]
    });
  }

  calcularCotizacion() {
    this.volumen = (this.cotizadorForm.get('largo')?.value * 
                    this.cotizadorForm.get('ancho')?.value * 
                    this.cotizadorForm.get('alto')?.value); // en cm3
    if ((this.volumen) / 1000000 > 2) {
      this.showConfirmMsg = false;
      this.showErrorMsg = true;
    } else {
      this.costo = Math.ceil(this.volumen / 20 * 2000);
      this.numeroOrden = this.generarNumeroOrden();
      this.fecha = new Date().toLocaleDateString('es-CL');
      this.hora = new Date().toLocaleTimeString('es-CL');
      this.showErrorMsg = false;
      this.showConfirmMsg = true;
    }
  }

  generarNumeroOrden(): number {
    return Math.floor(Math.random() * 900000000) + 100000000;
  }

  close() {
    this.showErrorMsg = false;
    this.showConfirmMsg = false;
  }

  get isValid() {
    return this.cotizadorForm.valid;
  }
}