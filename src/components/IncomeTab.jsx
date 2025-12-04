import { Plus, Edit2, Trash2 } from 'lucide-react'
import { useStore } from '../App'
import toast from 'react-hot-toast'

export function IncomeTab() {
  const { ingresos, addIngreso, deleteIngreso } = useStore()

  const handleAdd = () => {
    const desc = prompt('Descripción')
    const monto = parseFloat(prompt('Monto (USD)') || 0)
    if (desc && monto > 0) {
      addIngreso({ descripcion: desc, monto, moneda: 'USD', categoria: 'Principal' })
      toast.success('Ingreso agregado')
    }
  }

  return (
    <div className="p-4">
      <button onClick={handleAdd} className="btn w-full mb-6 flex items-center justify-center gap-2">
        <Plus size={24} /> Agregar Ingreso
      </button>

      {ingresos.map(i => (
        <div key={i.id} className="card flex justify-between items-center">
          <div>
            <p className="font-semibold">{i.descripcion}</p>
            <p className="text-sm text-gray-600">{i.categoria}</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xl font-bold text-emerald-600">${i.monto.toFixed(2)}</span>
            <button onClick={() => deleteIngreso(i.id)}><Trash2 size={20} className="text-red-500" /></button>
          </div>
        </div>
      ))}

      <div className="mt-8 text-center">
        <p className="text-3xl font-bold text-emerald-600">
          Total Ingresos: ${ingresos.reduce((s, i) => s + i.monto, 0).toFixed(2)} USD
        </p>
      </div>
    </div>
  )
}
