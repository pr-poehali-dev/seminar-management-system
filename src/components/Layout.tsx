import { ReactNode, useState } from 'react';
import Sidebar from './Sidebar';
import Icon from '@/components/ui/icon';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
            <span className="text-sm text-gray-700 hidden sm:inline">Admin e-mail</span>
          </div>
        </header>
        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}