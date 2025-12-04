import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { useStore } from '../App';

const DashboardTab = () => {
  const { ingresos, gastos, config } = useStore();
  const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

  const data = meses.map((mes, i) => ({
    mes,
    ingresos: ingresos.filter((item) => item.mes === i).reduce((sum, item) => sum + item.monto, 0),
    gastos: gastos.filter((item) => item.mes === i).reduce((sum, item) => sum + item.montoUsd, 0),
  }));

  const totalBalance = data.reduce((sum, d) => sum + d.ingresos - d.gastos, 0);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Balance Anual: ${totalBalance.toFixed(2)} USD</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="mes" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="ingresos" fill="#059669" />
          <Bar dataKey="gastos" fill="#ef4444" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export { DashboardTab };
