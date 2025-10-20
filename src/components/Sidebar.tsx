import { Link, useLocation } from 'react-router-dom';
import Icon from '@/components/ui/icon';

const menuItems = [
  { path: '/applications', label: 'Заявки', icon: 'UserCircle' },
  { path: '/products', label: 'Продукты', icon: 'Lock' },
  { path: '/users', label: 'Пользователи', icon: 'Users' },
  { path: '/categories', label: 'Категории', icon: 'Folder' },
  { path: '/cities', label: 'Города', icon: 'BookOpen' },
  { path: '/brands', label: 'Бренды', icon: 'Star' },
  { path: '/protocols', label: 'Протоколы', icon: 'CreditCard' },
  { path: '/orders', label: 'Заказы', icon: 'Tag' },
  { path: '/banners', label: 'Баннеры', icon: 'CreditCard' },
  { path: '/seminars', label: 'Семинары', icon: 'Calendar' },
  { path: '/promocodes', label: 'Промокоды', icon: 'DollarSign' },
  { path: '/settings', label: 'Настройки', icon: 'Settings' },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const location = useLocation();

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}
      
      <aside className={`w-[230px] min-h-screen bg-white border-r border-gray-200 fixed left-0 top-0 flex flex-col z-50 transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-bold">F</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">FILARA</h1>
            <p className="text-xs text-gray-500">COSMO</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 py-4 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => onClose?.()}
              className={`flex items-center gap-3 px-6 py-3 transition-colors ${
                isActive
                  ? 'bg-purple-100 text-purple-600 border-r-4 border-purple-600'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon name={item.icon as any} size={20} />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
    </>
  );
}