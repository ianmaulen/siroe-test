import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CotizadorComponent } from './cotizador/cotizador.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CotizadorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'SIROE TEST';
}
