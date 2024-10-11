// src/components/Sidebar.jsx

import { Link } from 'react-router-dom'; // Link kullanarak navigasyonu yapabiliriz

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white fixed">
      <div className="p-4 text-xl font-bold">
        Admin Panel
      </div>
      <ul className="mt-6">
        <li className="px-4 py-2 hover:bg-gray-700">
          <Link to="/manage-question-package">Manage Question Package</Link>
        </li>
        <li className="px-4 py-2 hover:bg-gray-700">
          <Link to="/interview-list">Interview List</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;