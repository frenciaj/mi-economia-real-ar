import { BarChart2, ArrowUp, ArrowDown } from 'lucide-react';
import { useStore } from '../App';

const BottomNav = () => {
  const { activeTab, setActiveTab } = useStore();
  const tabs = [
    { id: 'dashboard', icon: BarChart2 },
    { id: 'ingresos', icon: ArrowUp },
    { id: 'gastos', icon: ArrowDown },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg flex justify-around p-2">
      {tabs.map((tab) => (
        <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`p-2 ${activeTab === tab.id ? 'text-emerald-600' : 'text-gray-500'}`}>
          <tab.icon size={28} />
        </button>
      ))}
    </nav>
  );
};

export { BottomNav };
