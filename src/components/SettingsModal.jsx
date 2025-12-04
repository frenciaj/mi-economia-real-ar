import { useStore } from '../App';

const SettingsModal = ({ onClose }) => {
  const { config, updateConfig } = useStore();
  const handleSave = () => {
    const newCotiz = parseFloat(prompt('Cotización Dólar', config.cotizDolar));
    const newInfl = parseFloat(prompt('Inflación Mensual %', config.inflacionDefault));
    updateConfig('cotizDolar', newCotiz);
    updateConfig('inflacionDefault', newInfl);
    toast.success('Configuración actualizada – totales recalculados!');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="card w-80">
        <h3 className="text-lg font-bold mb-4">Configuración</h3>
        <button onClick={handleSave} className="btn w-full">Guardar Cambios</button>
        <button onClick={onClose} className="mt-2 text-gray-500">Cancelar</button>
      </div>
    </div>
  );
};

export { SettingsModal };
