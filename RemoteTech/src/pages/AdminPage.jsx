import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

const AdminPanel = () => {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <div className="w-64">
        <Sidebar />
      </div>

      {/* Ana İçerik */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />

        {/* İçerik Alanı */}
        <main className="flex-1 p-6">
          {/* Yatay Çizgi */}
          <hr className="border-gray-300 my-6" />
          
          {/* Sayfa İçeriği */}
          <div className="mt-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;