// src/components/PackageTitle.jsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import usePackageStore from "../store/packageStore";
import AddQuestionModal from "../components/AddQuestionModal";
import { useSnackbar } from 'notistack';
import axios from 'axios';
import useAuthStore from '../store/authStore';

const PackageTitle = () => {
  const { selectedPackage, clearSelectedPackage } = usePackageStore();
  const [packageTitle, setPackageTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { getToken } = useAuthStore();

  useEffect(() => {
    if (selectedPackage) {
      setPackageTitle(selectedPackage.packageName);
      setQuestions(selectedPackage.questions);
    }
    return () => {
      clearSelectedPackage();
    };
  }, [selectedPackage, clearSelectedPackage]);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const addQuestion = (question, time) => {
    setQuestions([...questions, { id: questions.length + 1, question, time }]);
    closeModal();
    enqueueSnackbar('Question added successfully!', { variant: 'success' });
  };

  const removeQuestion = (id) => {
    setQuestions(questions.filter((q) => q.id !== id));
    enqueueSnackbar('Question deleted successfully!', { variant: 'success' });
  };

  const handleSave = async () => {
    const packageData = {
      packageName: packageTitle,
      questions: questions,
    };

    try {
      if (selectedPackage) {
        await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}packages/${selectedPackage.id}`,
          packageData,
          {
            headers: {
              Authorization: `Bearer ${getToken()}`, // Authorization başlığı ile token gönderiliyor
            },
            withCredentials: true, // Cookie'leri dahil ediyoruz
          }
        );
        enqueueSnackbar("Package updated successfully!", { variant: "success" });
      } else {
        await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}packages`,
          packageData,
          {
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
            withCredentials: true,
          }
        );
        enqueueSnackbar("Package saved successfully!", { variant: "success" });
      }
      navigate("/manage-question-package", { state: { refresh: true } });
    } catch (error) {
      console.error('Error details:', error);
      enqueueSnackbar(
        error.response?.data?.message || "An error occurred",
        { variant: "error" }
      );
    }
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-md rounded-md p-8 w-full max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">{selectedPackage ? 'Edit Package' : 'Create Package'}</h2>
          <input
            type="text"
            placeholder="Package Title..."
            className="border p-2 w-1/2 rounded"
            value={packageTitle}
            onChange={(e) => setPackageTitle(e.target.value)}
          />
          <button
            onClick={openModal}
            className="text-blue-600 text-2xl ml-4 hover:text-blue-800 transition"
          >
            ➕
          </button>
        </div>

        <table className="w-full table-auto bg-white rounded-md shadow-md">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border-b-2 border-gray-300 text-left">Order</th>
              <th className="py-2 px-4 border-b-2 border-gray-300 text-left">Question</th>
              <th className="py-2 px-4 border-b-2 border-gray-300 text-left">Time</th>
              <th className="py-2 px-4 border-b-2 border-gray-300 text-left">Action</th>
            </tr>
          </thead>
        </table>

        <div className="space-y-4 mt-4">
          {questions.length > 0 ? (
            questions.map((q, index) => (
              <div
                key={q.id}
                className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md"
              >
                <span className="w-1/6">{index + 1}</span>
                <span className="w-1/2">{q.question}</span>
                <span className="w-1/6">{q.time}</span>
                <button
                  onClick={() => removeQuestion(q.id)}
                  className="text-gray-600 hover:text-red-600"
                >
                  🗑️
                </button>
              </div>
            ))
          ) : (
            <div className="text-center py-4">
              No questions added.
            </div>
          )}
        </div>

        <div className="flex justify-between mt-6">
          <button
            className="bg-gray-400 text-white px-4 py-2 rounded"
            onClick={() => navigate("/manage-question-package")}
          >
            Cancel
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
      {showModal && <AddQuestionModal onClose={closeModal} onAdd={addQuestion} />}
    </div>
  );
};

export default PackageTitle;
