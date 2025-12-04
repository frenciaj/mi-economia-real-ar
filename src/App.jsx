// src/App.jsx  ← REEMPLAZÁ TODO ESTE ARCHIVO
import { useEffect } from 'react'
import { create } from 'zustand'
import toast from 'react-hot-toast'
import { BottomNav } from './components/BottomNav'
import { IncomeTab } from './components/IncomeTab'
import { ExpenseTab } from './components/ExpenseTab'
import { DashboardTab } from './components/DashboardTab'
import { SettingsModal } from './components/SettingsModal'
import { initialIncomes } from './data/initialIncomes'

// CREAMOS EL STORE GLOBAL Y LO EXPORTAMOS
export const useStore = create((set, get) => ({
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

  addIngreso: (i) => set((state) => ({
    ingresos: [...state.ingresos, { ...i, id: Date.now(), moneda: 'USD' }]
  })),
  addGasto: (g) => set((state) => ({
    gastos: [...state.gastos, { ...g, id: Date.now() }]
  })),
  deleteIngreso: (id) => set((state) => ({
    ingresos: state.ingresos.filter(x => x.id !== id)
  })),
  deleteGasto: (id) => set((state) => ({
    gastos: state.gastos.filter(x => x.id !== id)
  })),
}))

export default function App() {
  const { activeTab, showSettings, setShowSettings, loadInitial } = useStore()

  // Carga inicial + autosave
  useEffect(() => {
    const saved = localStorage.getItem('miEconomiaData')
    if (saved) {
      const parsed = JSON.parse(saved)
      useStore.setState(parsed)
    } else {
      loadInitial()
      toast.success('¡Datos de tu CSV cargados!')
    }

    const interval = setInterval(() => {
      localStorage.setItem('miEconomiaData', JSON.stringify(useStore.getState()))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <div className="pb-20 min-h-screen">
        <header className="bg-emerald-600 text-white p-5 text-center shadow-lg fixed top-0 left-0 right-0 z-10">
          <h1 className="text-2xl font-bold">Mi Economía Real AR</h1>
          <button onClick={() => setShowSettings(true)} className="absolute right-5 top-5 text-2xl">⚙️</button>
        </header>

        <main className="pt-20">
          {activeTab === 'ingresos' && <IncomeTab />}
          {activeTab === 'gastos' && <ExpenseTab />}
          {activeTab === 'dashboard' && <DashboardTab />}
        </main>
      </div>

      <BottomNav />
      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
    </>
  )
}
