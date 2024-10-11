import { useEffect } from "react";
import usePackageStore from "../store/packageStore";
import { useNavigate, useLocation } from "react-router-dom";
import { useSnackbar } from 'notistack';
import useAuthStore from '../store/authStore';

const ManagePackages = () => {
  const { packages, removePackage, selectPackage, fetchPackages } = usePackageStore();
  const { getToken } = useAuthStore();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const location = useLocation();

  useEffect(() => {
    const fetchPackagesWithAuth = async () => {
      try {
        await fetchPackages({
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
          withCredentials: true,
        });
      } catch (error) {
        console.error("Error fetching packages:", error);
        enqueueSnackbar('Failed to fetch packages!', { variant: 'error' });
      }
    };

    fetchPackagesWithAuth();
  }, [fetchPackages, getToken, enqueueSnackbar]);

  const handleAddPackageClick = () => {
    navigate("/create-package");
  };

  const handleEdit = (id) => {
    selectPackage(id);
    navigate("/create-package");
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this package?");
    if (confirmDelete) {
      try {
        await removePackage(id, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
          withCredentials: true,
        });
        enqueueSnackbar('Package deleted successfully!', { variant: 'success' });
      } catch (error) {
        console.error("Error deleting package:", error);
        enqueueSnackbar('Failed to delete package!', { variant: 'error' });
      }
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-md rounded-md p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Manage Question Packages</h2>
          <button
            onClick={handleAddPackageClick}
            className="text-blue-600 text-2xl ml-4 hover:text-blue-800 transition"
          >
            ➕
          </button>
        </div>

        <table className="w-full table-auto bg-white rounded-md shadow-md">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border-b-2 border-gray-300 text-left">#</th>
              <th className="py-2 px-4 border-b-2 border-gray-300 text-left">Package Name</th>
              <th className="py-2 px-4 border-b-2 border-gray-300 text-left">Question Count</th>
              <th className="py-2 px-4 border-b-2 border-gray-300 text-left">Action</th>
            </tr>
          </thead>
        </table>

        <div className="space-y-4 mt-4">
          {Array.isArray(packages) && packages.length > 0 ? (
            packages.map((pkg, index) => (
              <div 
                key={pkg.id || index} // Benzersiz key prop'u veriliyor
                className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md"
              >
                <span className="w-1/12">{index + 1}</span>
                <span className="w-4/12">{pkg.packageName}</span>
                <span className="w-3/12">{pkg.questions.length}</span>
                <div className="w-3/12 flex space-x-2">
                  <button 
                    onClick={() => handleEdit(pkg.id)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    ✏️ Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(pkg.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-4">
              No question packages found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManagePackages;
