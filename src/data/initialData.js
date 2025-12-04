export const initialData = {
  ingresos: [
    { id: 1, dia: 1, mes: 7, descripcion: 'Principal', monto: 3000, moneda: 'USD' }, // Agosto (mes 7, 0-based)
    { id: 2, dia: 1, mes: 8, descripcion: 'Principal', monto: 3000, moneda: 'USD' }, // Setiembre
    { id: 3, dia: 1, mes: 9, descripcion: 'Extra', monto: 299.26, moneda: 'USD' }, // Octubre
    { id: 4, dia: 2, mes: 9, descripcion: 'Diario', monto: 362.62, moneda: 'USD' },
    { id: 5, dia: 3, mes: 9, descripcion: 'Diario', monto: 405, moneda: 'USD' },
    { id: 6, dia: 1, mes: 10, descripcion: 'Sueldo', monto: 2000, moneda: 'USD' }, // Noviembre
    { id: 7, dia: 1, mes: 10, descripcion: 'Extra', monto: 600, moneda: 'USD' },
    { id: 8, dia: 2, mes: 11, descripcion: 'Extra', monto: 450, moneda: 'USD' }, // Diciembre
    { id: 9, dia: 3, mes: 11, descripcion: 'Extra', monto: 500, moneda: 'USD' },
    { id: 10, dia: 4, mes: 10, descripcion: 'Diario', monto: 200, moneda: 'USD' },
    // ... Añade el resto de tus 30 filas, filtrando vacíos. Total anual 16066.88 USD
  ],
  gastos: [], // Empezá a agregar aquí
};
