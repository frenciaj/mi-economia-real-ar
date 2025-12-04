import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { useStore } from '../App'

export function DashboardTab() {
  const { ingresos, gastos, config } = useStore()

  const totalIngresos = ingresos.reduce((s, i) => s + i.monto, 0)
  const totalGastos = gastos.reduce((s, g) => s + (g.montoUsd || 0), 0)
  const balance = totalIngresos - totalGastos

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 gap-6 mb-8">
        <div className="card text-center">
          <p className="text-gray-600">Balance Actual</p>
          <p className={`text-4xl font-bold ${balance >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
            ${balance.toFixed(2)} USD
          </p>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold mb-4 text-center">Cotización Dólar: ${config.cotizDolar}</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={[
            { name: 'Ingresos', value: totalIngresos },
            { name: 'Gastos', value: totalGastos },
          ]}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#059669" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
