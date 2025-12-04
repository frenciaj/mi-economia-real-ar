import { useStore } from '../App';

export const AnnualTable = () => {
  const { ingresos, gastos, config } = useStore();
  const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  const totalesMes = meses.map(mes => {
    const ingMes = ingresos.filter(i => i.mes === mes).reduce((sum, i) => sum + i.monto, 0);
    const gasMes = gastos.filter(g => g.mes === mes).reduce((sum, g) => sum + (g.moneda === 'ARS' ? g.monto / config.cotizDolar : g.monto), 0);
    return { mes, ingresos: ingMes, gastos: gasMes, balance: ingMes - gasMes };
  });

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead>
          <tr className="bg-emerald-600 text-white">
            <th className="px-4 py-2">Mes</th>
            {meses.map(m => <th key={m} className="px-4 py-2">{m}</th>)} {/* Wait, no: headers son meses */}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-4 py-2 font-bold">Ingresos USD</td>
            {totalesMes.map(t => <td key={t.mes} className="px-4 py-2 text-center">${t.ingresos.toFixed(2)}</td>)}
          </tr>
          <tr className="bg-red-50">
            <td className="px-4 py-2 font-bold">Gastos USD</td>
            {totalesMes.map(t => <td key={t.mes} className="px-4 py-2 text-center text-red-600">${t.gastos.toFixed(2)}</td>)}
          </tr>
          <tr className="bg-green-50">
            <td className="px-4 py-2 font-bold">Balance</td>
            {totalesMes.map(t => <td key={t.mes} className={`px-4 py-2 text-center ${t.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>${t.balance.toFixed(2)}</td>)}
          </tr>
        </tbody>
        <tfoot>
          <tr className="bg-gray-100 font-bold">
            <td className="px-4 py-2">TOTAL</td>
            <td className="px-4 py-2 text-2xl text-emerald-600 col-span-12">${totalesMes.reduce((sum, t) => sum + t.ingresos - t.gastos, 0).toFixed(2)} USD</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};
