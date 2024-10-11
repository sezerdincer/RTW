// src/components/CreatePackageForm.jsx

import React, { useState } from "react";
import axios from "axios";
import useAuthStore from "../store/authStore";

const CreatePackageForm = ({ onClose }) => {
  const [packageName, setPackageName] = useState("");
  const [questions, setQuestions] = useState([]);
  const [questionContent, setQuestionContent] = useState("");
  const [questionDetails, setQuestionDetails] = useState({
    type: "Sequential",
    allowSkip: false,
  });

  const { getToken } = useAuthStore(); // Token'ı almak için authStore'dan getToken fonksiyonunu kullanıyoruz

  const addQuestion = () => {
    setQuestions([...questions, { content: questionContent, details: questionDetails }]);
    setQuestionContent("");
  };

  // Yeni paketi backend'e ekleyen fonksiyon
  const addPackage = async (newPackage) => {
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}packages`, newPackage, {
        headers: {
          Authorization: `Bearer ${getToken()}`, // Token'ı Authorization başlığına ekliyoruz
        },
        withCredentials: true, // Cookie'leri dahil ediyoruz
      });
    } catch (error) {
      console.error('Error creating package:', error);
    }
  };

  const createPackage = () => {
    const newPackage = { packageName, questions };
    addPackage(newPackage);
    setPackageName("");
    setQuestions([]);
    onClose(); // Formu kapatır
  };

  return (
    <div className="p-6 bg-gray-200 shadow-md rounded-md mt-4">
      <h2 className="text-xl font-semibold mb-4">Create a Question Package</h2>

      <div className="mb-4">
        <label className="block text-gray-700">Package Name</label>
        <input
          type="text"
          className="border p-2 w-full rounded"
          value={packageName}
          onChange={(e) => setPackageName(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Question Content</label>
        <input
          type="text"
          className="border p-2 w-full rounded"
          value={questionContent}
          onChange={(e) => setQuestionContent(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Question Type</label>
        <select
          className="border p-2 w-full rounded"
          value={questionDetails.type}
          onChange={(e) =>
            setQuestionDetails({ ...questionDetails, type: e.target.value })
          }
        >
          <option value="Sequential">Sequential</option>
          <option value="Single">Single</option>
          <option value="Timed">Timed</option>
          <option value="Untimed">Untimed</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Allow Skip</label>
        <input
          type="checkbox"
          checked={questionDetails.allowSkip}
          onChange={(e) =>
            setQuestionDetails({ ...questionDetails, allowSkip: e.target.checked })
          }
        />
      </div>

      <button
        onClick={addQuestion}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Add Question
      </button>

      <div className="mt-6">
        <h3 className="font-semibold">Added Questions:</h3>
        <ul>
          {questions.map((q, index) => (
            <li key={index} className="border p-2 mt-2 rounded">
              {q.content} - {q.details.type} -{" "}
              {q.details.allowSkip ? "Skippable" : "Not Skippable"}
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={createPackage}
        className="mt-6 bg-green-500 text-white px-4 py-2 rounded-md"
      >
        Save Package
      </button>
      <button
        onClick={onClose}
        className="mt-6 bg-red-500 text-white px-4 py-2 rounded-md"
      >
        Cancel
      </button>
    </div>
  );
};

export default CreatePackageForm;
