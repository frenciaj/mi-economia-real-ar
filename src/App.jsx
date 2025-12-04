import { useEffect } from 'react';
import { create } from 'zustand';
import toast from 'react-hot-toast';
import { BottomNav } from './components/BottomNav';
import { IncomeTab } from './components/IncomeTab';
import { ExpenseTab } from './components/ExpenseTab';
import { DashboardTab } from './components/DashboardTab';
import { SettingsModal } from './components/SettingsModal';
import { initialData } from './data/initialData';

export const useStore = create((set, get) => ({
  ingresos: [],
  gastos: [],
  config: { cotizDolar: 1400, inflacionDefault: 4 },
  activeTab: 'dashboard',
  showSettings: false,
  setActiveTab: (tab) => set({ activeTab: tab }),
  setShowSettings: (show) => set({ showSettings: show }),
  loadInitial: () => set({ ingresos: initialData.ingresos, gastos: initialData.gastos }),
  updateConfig: (key, value) => set((state) => ({ config: { ...state.config, [key]: value } })),
  addIngreso: (i) => set((state) => ({ ingresos: [...state.ingresos, { ...i, id: Date.now() }] })),
  addGasto: (g) => set((state) => ({ gastos: [...state.gastos, { ...g, id: Date.now() }] })),
  deleteItem: (id, tipo) => set((state) => ({ [tipo]: state[tipo].filter((item) => item.id !== id) })),
  addRecurrentGasto: (baseGasto) => {
    const { config } = get();
    let montoActual = baseGasto.monto;
    const newGastos = [];
    for (let m = 0; m < 12; m++) {
      const montoUsd = baseGasto.moneda === 'USD' ? montoActual : montoActual / config.cotizDolar;
      newGastos.push({
        ...baseGasto,
        id: Date.now() + m,
        mes: (baseGasto.mes + m) % 12,
        monto: montoActual,
        montoUsd
      });
      montoActual *= 1 + config.inflacionDefault / 100;
    }
    set((state) => ({ gastos: [...state.gastos, ...newGastos] }));
    toast.success('Gastos recurrentes agregados con inflación!');
  },
}));

const App = () => {
  const loadInitial = useStore((s) => s.loadInitial);
  const showSettings = useStore((s) => s.showSettings);
  const setShowSettings = useStore((s) => s.setShowSettings);

  useEffect(() => {
    const saved = localStorage.getItem('economiaData');
    if (saved) {
      useStore.setState(JSON.parse(saved));
    } else {
      loadInitial();
    }
    const interval = setInterval(() => localStorage.setItem('economiaData', JSON.stringify(useStore.getState())), 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen pb-20">
      <header className="fixed top-0 left-0 right-0 bg-emerald-600 text-white p-4 text-center shadow-lg z-10">
        <h1 className="text-xl font-bold">Mi Economía Real AR</h1>
        <button onClick={() => setShowSettings(true)} className="absolute right-4 top-4 text-xl">⚙️</button>
      </header>
      <main className="pt-16">
        {useStore((s) => s.activeTab) === 'dashboard' && <DashboardTab />}
        {useStore((s) => s.activeTab) === 'ingresos' && <IncomeTab />}
        {useStore((s) => s.activeTab) === 'gastos' && <ExpenseTab />}
      </main>
      <BottomNav />
      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
    </div>
  );
};

export default App;
