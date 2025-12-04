import { useStore } from '../App'
import toast from 'react-hot-toast'

export function SettingsModal({ isOpen, onClose }) {
  const { config, updateConfig } = useStore()

  if (!isOpen) return null

  const handleSave = () => {
    const cotiz = parseFloat(prompt('Cotización del dólar', config.cotizDolar) || config.cotizDolar)
    const infl = parseFloat(prompt('Inflación mensual %', config.inflacionDefault) || config.inflacionDefault)
    updateConfig('cotizDolar', cotiz)
    updateConfig('inflacionDefault', infl)
    toast.success('Configuración guardada')
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="card max-w-sm w-full mx-4" onClick={e => e.stopPropagation()}>
        <h2 className="text-2xl font-bold mb-6 text-center">Configuración</h2>
        <button onClick={handleSave} className="btn w-full">Actualizar Cotización e Inflación</button>
        <button onClick={onClose} className="mt-4 text-gray-500">Cerrar</button>
      </div>
    </div>
  )
}
