import { ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Icon from '@/components/ui/icon';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout } from '@/store/authSlice';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userEmail = useAppSelector((state) => state.auth.userEmail);

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Вы вышли из системы');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="md:ml-[230px]">
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 md:px-6">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 hover:bg-gray-50 rounded-lg transition-colors md:hidden"
          >
            <Icon name="Menu" size={24} className="text-gray-600" />
          </button>
          <div className="flex items-center gap-4 ml-auto">
            <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
              <Icon name="Bell" size={20} className="text-gray-600" />
            </button>
            
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors">
                <span className="text-sm text-gray-700 hidden sm:inline">
                  {userEmail || 'Admin e-mail'}
                </span>
                <Icon name="ChevronDown" size={16} className="text-gray-600" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                  <Icon name="LogOut" size={16} className="mr-2" />
                  Выйти
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}