import { Home, ArrowUpRight, ArrowDownRight, BarChart3 } from 'lucide-react'
import { useStore } from '../App'

export function BottomNav() {
  const { activeTab, setActiveTab } = useStore()

  const tabs = [
    { id: 'dashboard', icon: BarChart3, label: 'Dashboard' },
    { id: 'ingresos', icon: ArrowUpRight, label: 'Ingresos' },
    { id: 'gastos', icon: ArrowDownRight, label: 'Gastos' },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-gray-200">
      <div className="flex justify-around py-2">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center p-3 rounded-lg transition-all ${
              activeTab === tab.id ? 'text-emerald-600' : 'text-gray-500'
            }`}
          >
            <tab.icon size={28} />
            <span className="text-xs mt-1">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
