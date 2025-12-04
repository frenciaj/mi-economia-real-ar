import { useEffect } from 'react'
import { create } from 'zustand'
import toast from 'react-hot-toast'
import { BottomNav } from './components/BottomNav'
import { IncomeTab } from './components/IncomeTab'
import { ExpenseTab } from './components/ExpenseTab'
import { DashboardTab } from './components/DashboardTab'
import { SettingsModal } from './components/SettingsModal'
import { initialIncomes } from './data/initialIncomes'

const useStore = create((set) => ({
  ingresos: [],
  gastos: [],
  config: { cotizDolar: 1400, inflacionDefault: 4 },
  activeTab: 'dashboard',
  showSettings: false,
  setActiveTab: (tab) => set({ activeTab: tab }),
  setShowSettings: (show) => set({ showSettings: show }),
  loadInitial: () => set({ ingresos: initialIncomes, gastos: [] }),
  updateConfig: (key, value) => set((state) => ({
    config: { ...state.config, [key]: value }
  })),
  addIngreso: (i) => set((state) => ({ ingresos: [...state.ingresos, { ...i, id: Date.now() }] })),
  addGasto: (g) => set((state) => ({ gastos: [...state.gastos, { ...g, id: Date.now() }] })),
  deleteIngreso: (id) => set((state) => ({ ingresos: state.ingresos.filter(x => x.id !== id) })),
  deleteGasto: (id) => set((state) => ({ gastos: state.gastos.filter(x => x.id !== id) })),
}))

export default function App() {
  const { activeTab, showSettings, setShowSettings, loadInitial } = useStore()

  useEffect(() => {
    const saved = localStorage.getItem('miEconomiaData')
    if (saved) {
      useStore.setState(JSON.parse(saved))
    } else {
      loadInitial()
      toast.success('¡Datos iniciales cargados desde tu CSV!')
    }

    const interval = setInterval(() => {
      localStorage.setItem('miEconomiaData', JSON.stringify(useStore.getState()))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <div className="pb-20">
        <header className="bg-emerald-600 text-white p-4 text-center shadow-lg">
          <h1 className="text-2xl font-bold">Mi Economía Real AR</h1>
          <button onClick={() => setShowSettings(true)} className="absolute right-4 top-4 text-xl">⚙️</button>
        </header>

        {activeTab === 'ingresos' && <IncomeTab />}
        {activeTab === 'gastos' && <ExpenseTab />}
        {activeTab === 'dashboard' && <DashboardTab />}
      </div>

      <BottomNav />
      <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />
    </>
  )
}
