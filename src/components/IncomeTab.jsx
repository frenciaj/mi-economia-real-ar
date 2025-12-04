import { Trash2 } from 'lucide-react';
import { useStore } from '../App';
import { useSwipeable } from 'react-swipeable';

const IncomeTab = () => {
  const { ingresos, addIngreso, deleteItem } = useStore();

  const handleAdd = () => {
    const desc = prompt('Descripción');
    const monto = parseFloat(prompt('Monto USD'));
    const dia = parseInt(prompt('Día'));
    const mes = parseInt(prompt('Mes (1-12)')) - 1;
    if (desc && monto && dia && mes >= 0) {
      addIngreso({ descripcion: desc, monto, moneda: 'USD', dia, mes, id: Date.now() });
      toast.success('Ingreso agregado');
    }
  };

  const handlers = useSwipeable({
    onSwipedRight: (e) => deleteItem(e.event.target.dataset.id, 'ingresos'),
  });

  return (
    <div className="p-4" {...handlers}>
      <button onClick={handleAdd} className="btn w-full mb-4">+ Ingreso</button>
      {ingresos.map((i) => (
        <div key={i.id} data-id={i.id} className="card flex justify-between">
          <div>
            <p className="font-bold">{i.descripcion}</p>
            <p>Día {i.dia} - Mes {i.mes + 1}</p>
          </div>
          <div className="flex items-center gap-2">
            ${i.monto.toFixed(2)}
            <Trash2 size={20} className="text-red-500" onClick={() => deleteItem(i.id, 'ingresos')} />
          </div>
        </div>
      ))}
    </div>
  );
};

export { IncomeTab };
