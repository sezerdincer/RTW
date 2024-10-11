import { useState, useEffect } from 'react';
import InterviewCard from '../components/InterviewCard';
import Modal from '../components/createInterviewModal';
import useInterviewStore from '../store/interviewStore'; // Interview store import

const InterviewList = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalKey, setModalKey] = useState(0); // Modalın her seferinde temizlenmesi için anahtar ekliyoruz.
  
  const { interviews, fetchInterviews, createInterview, deleteInterview } = useInterviewStore(); // Store'dan fonksiyonları ve veriyi alıyoruz

  // İlk yüklemede mülakatları backend'den çekiyoruz
  useEffect(() => {
    fetchInterviews();
  }, [fetchInterviews]);

  // Kartı silme fonksiyonu
  const handleDelete = async (id) => {
    await deleteInterview(id); // Backend'den silme işlemi
  };

  // Modal'dan gelen yeni mülakatı ekleme fonksiyonu
  const addNewInterview = async (newInterview) => {
    await createInterview(newInterview); // Yeni mülakatı backend'e gönderiyoruz
  };

  const openModal = () => {
    setModalKey(modalKey + 1); // Modal'ı sıfırlamak için anahtarı her seferinde artırıyoruz.
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  return (
    <div className="relative">
      {/* Sayfa Başlığı ve Sağ Üstte + Butonu */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Interview List</h2>
        <button 
          className="bg-gray-800 text-white rounded-md p-2 shadow-lg hover:bg-gray-700 transition duration-300"
          onClick={openModal}
        >
          +
        </button>
      </div>

      {/* Interview Listesi */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {interviews.map((interview) => (
          <InterviewCard key={interview._id} interview={interview} onDelete={handleDelete} />
        ))}
      </div>

      {/* Modal */}
      <Modal key={modalKey} isOpen={isModalOpen} onClose={closeModal} onSave={addNewInterview} />
    </div>
  );
};

export default InterviewList;
