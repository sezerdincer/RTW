// src/stores/usePackageStore.js
import { create } from 'zustand';
import axios from 'axios';
import useAuthStore from './authStore';

const baseURL = import.meta.env.VITE_BACKEND_URL.endsWith('/')
  ? import.meta.env.VITE_BACKEND_URL
  : `${import.meta.env.VITE_BACKEND_URL}/`;

const usePackageStore = create((set) => {
  const { getToken } = useAuthStore.getState(); // authStore'dan token'ı alıyoruz

  return {
    packages: [],
    selectedPackage: null,

    // Paketleri backend'den çekip store'a kaydeder
    fetchPackages: async () => {
      try {
        const response = await axios.get(`${baseURL}packages`, {
          headers: {
            Authorization: `Bearer ${getToken()}`, // Authorization başlığı
          },
          withCredentials: true, // Cookie'leri dahil ediyoruz
        });
        set({ packages: response.data });
      } catch (error) {
        console.error('Error fetching packages:', error);
      }
    },

    // Paketleri silme
    removePackage: (id) => set((state) => ({
      packages: state.packages.filter(pkg => pkg.id !== id),
    })),

    // Seçili paket belirleme
    selectPackage: (packageId) => set((state) => ({
      selectedPackage: state.packages.find(pkg => pkg.id === packageId),
    })),

    // Seçili paketi temizleme
    clearSelectedPackage: () => set(() => ({ selectedPackage: null })),
  };
});

export default usePackageStore;
