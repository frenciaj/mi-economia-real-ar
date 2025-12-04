import { Trash2 } from 'lucide-react';
import { useStore } from '../App';
import { useSwipeable } from 'react-swipeable';

const ExpenseTab = () => {
  const { gastos, addRecurrentGasto, deleteItem, config } = useStore();

  const handleAdd = () => {
    const desc = prompt('Descripción');
    const monto = parseFloat(prompt('Monto'));
    const moneda = prompt('Moneda (ARS/USD)', 'ARS').toUpperCase();
    const dia = parseInt(prompt('Día'));
    const mes = parseInt(prompt('Mes (1-12)')) - 1;
    if (desc && monto && moneda && dia && mes >= 0) {
      addRecurrentGasto({ descripcion: desc, monto, moneda, dia, mes, categoria: 'Gasto' });
    }
  };

  const handlers = useSwipeable({
    onSwipedRight: (e) => deleteItem(e.event.target.dataset.id, 'gastos'),
  });

  return (
    <div className="p-4" {...handlers}>
      <button onClick={handleAdd} className="btn w-full mb-4">+ Gasto Recurrente</button>
      {gastos.map((g) => (
        <div key={g.id} data-id={g.id} className="card flex justify-between">
          <div>
            <p className="font-bold">{g.descripcion}</p>
            <p>Día {g.dia} - Mes {g.mes + 1} - {g.moneda}</p>
          </div>
          <div className="flex items-center gap-2 text-red-500">
            ${g.montoUsd.toFixed(2)} USD
            <Trash2 size= {20} onClick={() => deleteItem(g.id, 'gastos')} />
          </div>
        </div>
      ))}
    </div>
  );
};

export { ExpenseTab };
