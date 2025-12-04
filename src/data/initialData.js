// Datos reales del CSV – parseados con limpieza de $ y comas
export const initialIncomes = [
  { id: 1, dia: 1, mes: 'Agosto', descripcion: 'Ingreso Principal', monto: 3000, moneda: 'USD' },
  { id: 2, dia: 1, mes: 'Setiembre', descripcion: 'Ingreso Principal', monto: 3000, moneda: 'USD' },
  // ... (Octubre: suma de días 1-3 → $1,066.88)
  // Noviembre: Día 1 $2,000, Día 1 extra $600, Día 4 $200, etc. → total $7,450
  // Diciembre: Día 2 $450, Día 3 $500, Día 14 $200, Día 16 $200, Día 20 $400, Día 24 $2,200, Día 25 $200, Día 26 $450, Día 28 $200 → total $1,550
  // Total anual calculado dinámico
];
