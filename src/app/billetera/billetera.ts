import { Component } from '@angular/core';
import { Movimiento } from '../movimiento';
import { NuevoMovimientoComponent } from '../nuevo-movimiento/nuevo-movimiento';

@Component({
  selector: 'app-billetera',
  imports: [NuevoMovimientoComponent],
  templateUrl: './billetera.html',
})
export class BilleteraComponent {
  saldo = 250;
  movimientos: Movimiento[] = [];

  registrarMovimiento(movimiento: Movimiento): void {
    const nuevoSaldo = movimiento.tipo === 'Recarga' ? this.saldo + movimiento.monto : this.saldo - movimiento.monto;
    this.saldo = Math.round(nuevoSaldo * 100) / 100;
    this.movimientos = [movimiento, ...this.movimientos];
  }
}
