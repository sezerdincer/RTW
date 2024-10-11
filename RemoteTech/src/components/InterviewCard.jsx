/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionModal from './QuestionListModal';
import usePackageStore from '../store/packageStore';
import useInterviewStore from '../store/interviewStore'; // Interview işlemleri için import

const InterviewCard = ({ interview, onDelete }) => {
  const { _id, title, total, onHold, status } = interview;
  const [isQuestionModalOpen, setQuestionModalOpen] = useState(false);
  const { packages, fetchPackages } = usePackageStore(); // Paketleri ve fetch fonksiyonunu alıyoruz
  const navigate = useNavigate();

  useEffect(() => {
    if (isQuestionModalOpen) {
      fetchPackages(); // Modal açıldığında paketleri backend'den çekiyoruz
    }
  }, [isQuestionModalOpen, fetchPackages]);

  const handleCopyLink = () => {
    const interviewLink = `https://example.com/interviews/${_id}`;
    navigator.clipboard.writeText(interviewLink)
      .then(() => alert('Link copied to clipboard!'))
      .catch(() => alert('Failed to copy the link'));
  };

  const openQuestionModal = () => setQuestionModalOpen(true);
  const closeQuestionModal = () => setQuestionModalOpen(false);

  const handleSeeVideos = () => {
    navigate(`/video-collection`, { state: { interviewId: _id } });
  };

  return (
    <div className="border border-gray-300 rounded-lg p-4 shadow-lg max-w-xs">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <button className="text-gray-500 hover:text-gray-700 mr-2" onClick={openQuestionModal}>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm0 18a8 8 0 118-8 8 8 0 01-8 8z" />
              <path d="M12 7a1 1 0 11-1 1 1 1 0 011-1zm0 10a1 1 0 01-1-1v-5a1 1 0 012 0v5a1 1 0 01-1 1z" />
            </svg>
          </button>
        </div>
        <h3 className="text-lg font-bold">{title}</h3>
        <div className="flex items-center">
          <button className="text-gray-500 hover:text-gray-700 mr-2" onClick={handleCopyLink}>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.414 10.586L13.414 6.586A2 2 0 0012 6H5a1 1 0 000 2h6.586l4 4H12a1 1 0 000 2h7a1 1 0 001-1v-7a1 1 0 00-2 0v3.586zM5 18h6a1 1 0 000-2H5a1 1 0 000 2z" />
            </svg>
          </button>
          <button className="text-gray-500 hover:text-gray-700" onClick={() => onDelete(_id)}>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 18c0 .55.45 1 1 1h10a1 1 0 001-1V7H6v11zm7-9h3v2h-3v3h-2v-3H8v-2h3V7h2v2zm2-5v2H9V4a1 1 0 011-1h4a1 1 0 011 1z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="text-center">
        <p className="text-sm text-gray-500">Candidates:</p>
        <div className="flex justify-center items-center bg-gray-100 rounded-lg p-2 mt-2 mb-4">
          <div className="flex flex-col items-center mr-4">
            <span className="text-lg font-bold">{total}</span>
            <span className="text-xs text-gray-500">Total</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-lg font-bold">{onHold}</span>
            <span className="text-xs text-gray-500">On Hold</span>
          </div>
        </div>
        <span
          className={`inline-block px-3 py-1 text-sm rounded-lg ${
            status === 'Published' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
          }`}
        >
          {status}
        </span>
      </div>

      <div className="mt-4 text-center">
        <button 
          onClick={handleSeeVideos}
          className="text-sm font-medium text-gray-700"
        >
          See Videos
        </button>
      </div>

      {isQuestionModalOpen && (
        <QuestionModal interviewId={_id} packages={packages} onClose={closeQuestionModal} />
      )}
    </div>
  );
};

export default InterviewCard;
