import { Plus, Trash2 } from 'lucide-react'
import { useStore } from '../App'
import toast from 'react-hot-toast'

export function ExpenseTab() {
  const { gastos, addGasto, deleteGasto, config } = useStore()

  const handleAdd = () => {
    const desc = prompt('Descripción del gasto')
    const montoStr = prompt('Monto')
    const moneda = prompt('Moneda (ARS/USD)', 'ARS').toUpperCase()
    const aplicarInflacion = confirm('¿Aplicar inflación mensual automática?')

    const monto = parseFloat(montoStr)
    if (!desc || isNaN(monto)) return

    const gastoBase = {
      descripcion: desc,
      monto,
      moneda,
      aplicarInflacion,
      inflacionMensual: config.inflacionDefault
    }

    if (aplicarInflacion) {
      // Genera 12 meses con inflación
      let montoActual = monto
      for (let mes = 0; mes < 12; mes++) {
        const montoUsd = moneda === 'USD' ? montoActual : montoActual / config.cotizDolar
        addGasto({ ...gastoBase, monto: montoActual, montoUsd, mes: new Date().getMonth() + mes })
        montoActual *= (1 + config.inflacionDefault / 100)
      }
      toast.success('Gasto recurrente creado por 12 meses con inflación')
    } else {
      const montoUsd = moneda === 'USD' ? monto : monto / config.cotizDolar
      addGasto({ ...gastoBase, montoUsd })
      toast.success('Gasto agregado')
    }
  }

  const totalUsd = gastos.reduce((s, g) => s + (g.montoUsd || 0), 0)

  return (
    <div className="p-4">
      <button onClick={handleAdd} className="btn w-full mb-6 flex items-center justify-center gap-2">
        <Plus size={24} /> Agregar Gasto
      </button>

      {gastos.map(g => (
        <div key={g.id} className="card flex justify-between items-center">
          <div>
            <p className="font-semibold">{g.descripcion}</p>
            <p className="text-sm text-gray-600">
              {g.monto.toLocaleString('es-AR')} {g.moneda}
              {g.aplicarInflacion && ' (inflación aplicada)'}
            </p>
          </div>
          <div className="text-right">
            <p className="font-bold text-red-600">${g.montoUsd?.toFixed(2) || '—'} USD</p>
            <button onClick={() => deleteGasto(g.id)}><Trash2 size={18} className="text-red-500 mt-1" /></button>
          </div>
        </div>
      ))}

      <div className="mt-8 text-center">
        <p className="text-3xl font-bold text-red-600">
          Total Gastos: ${totalUsd.toFixed(2)} USD
        </p>
      </div>
    </div>
  )
}
