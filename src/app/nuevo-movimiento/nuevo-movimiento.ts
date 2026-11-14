import { Component, input, output } from '@angular/core';
import { Movimiento, TipoMovimiento } from '../movimiento';

@Component({
  selector: 'app-nuevo-movimiento',
  templateUrl: './nuevo-movimiento.html',
})
export class NuevoMovimientoComponent {
  saldo = input.required<number>();
  movimiento = output<Movimiento>();

  tipo: TipoMovimiento = 'Recarga';
  montoTexto = '';
  tocado = false;

  cambiarTipo(valor: string): void {
    this.tipo = valor === 'Gasto' ? 'Gasto' : 'Recarga';
  }

  cambiarMonto(valor: string): void {
    this.montoTexto = valor;
    this.tocado = true;
  }

  monto(): number {
    const texto = this.montoTexto.trim().replace(',', '.');
    if (!/^-?\d+(\.\d+)?$/.test(texto)) {
      return NaN;
    }
    return Number(texto);
  }

  error(): string {
    if (this.montoTexto.trim() === '') {
      return this.tocado ? 'Ingrese un monto' : '';
    }
    const monto = this.monto();
    if (Number.isNaN(monto)) {
      return 'Ingrese un monto numérico válido';
    }
    if (monto <= 0) {
      return 'El monto debe ser mayor que cero';
    }
    if (this.tipo === 'Gasto' && monto > this.saldo()) {
      return 'Saldo insuficiente para realizar el gasto';
    }
    return '';
  }

  esValido(): boolean {
    return this.montoTexto.trim() !== '' && this.error() === '';
  }

  registrar(evento: Event): void {
    evento.preventDefault();
    if (!this.esValido()) {
      return;
    }
    this.movimiento.emit({ tipo: this.tipo, monto: this.monto() });
    this.montoTexto = '';
    this.tocado = false;
  }
}
