// src/stores/interviewStore.js
import { create } from 'zustand';
import axios from 'axios';
import useAuthStore from './authStore';

const baseURL = import.meta.env.VITE_BACKEND_URL.endsWith('/')
  ? import.meta.env.VITE_BACKEND_URL
  : `${import.meta.env.VITE_BACKEND_URL}/`;

const useInterviewStore = create((set) => {
  const { getToken } = useAuthStore.getState(); // Token almak için auth store'u kullan

  return {
    interviews: [],
    selectedInterview: null,
    interviewQuestions: [],

    // Mülakatları getirme
    fetchInterviews: async () => {
      try {
        const response = await axios.get(`${baseURL}interviews`, {
          headers: {
            Authorization: `Bearer ${getToken()}`, // Authorization başlığı
          },
          withCredentials: true, // Cookie'leri dahil ediyoruz
        });
        
        const currentDate = new Date();
        const updatedInterviews = response.data.map((interview) => {
          const expireDate = new Date(interview.expireDate);
          const status = expireDate < currentDate ? "Unpublished" : "Published";
          return { ...interview, status };
        });

        set({ interviews: updatedInterviews });
      } catch (error) {
        console.error("Error fetching interviews:", error);
      }
    },

    // Yeni mülakat oluşturma
    createInterview: async (newInterview) => {
      try {
        const response = await axios.post(`${baseURL}interviews`, newInterview, {
          headers: {
            Authorization: `Bearer ${getToken()}`, // Authorization başlığı
          },
          withCredentials: true,
        });
        set((state) => ({ interviews: [...state.interviews, response.data] }));
      } catch (error) {
        console.error("Error creating interview:", error);
      }
    },

    // Mülakatı silme
    deleteInterview: async (id) => {
      try {
        await axios.delete(`${baseURL}interviews/${id}`, {
          headers: {
            Authorization: `Bearer ${getToken()}`, // Authorization başlığı
          },
          withCredentials: true,
        });
        set((state) => ({
          interviews: state.interviews.filter((interview) => interview._id !== id),
        }));
      } catch (error) {
        console.error("Error deleting interview:", error);
      }
    },

    // Mülakat sorularını getirme
    fetchInterviewQuestions: async (interviewId) => {
      try {
        const response = await axios.get(`${baseURL}interviews/${interviewId}`, {
          headers: {
            Authorization: `Bearer ${getToken()}`, // Authorization başlığı
          },
          withCredentials: true,
        });

        const packages = response.data.packages;
        const questions = packages.flatMap((pkg) =>
          pkg.questions.map((q) => ({
            question: q.question,
            duration: q.time,
          }))
        );
        set({ interviewQuestions: questions });
      } catch (error) {
        console.error("Error fetching interview questions:", error);
      }
    },

    // Soruları temizleme
    clearInterviewQuestions: () => set({ interviewQuestions: [] }),
  };
});

export default useInterviewStore;
