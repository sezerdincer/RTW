/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import useInterviewStore from '../store/interviewStore';

const QuestionListModal = ({ interviewId, onClose }) => {
  const { interviewQuestions, fetchInterviewQuestions, clearInterviewQuestions } = useInterviewStore();

  useEffect(() => {
    if (interviewId) {
      fetchInterviewQuestions(interviewId);
    }

    return () => {
      clearInterviewQuestions();
    };
  }, [interviewId, fetchInterviewQuestions, clearInterviewQuestions]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h3 className="text-xl font-semibold mb-4">Interview Questions</h3>
        <ul>
          {interviewQuestions.length > 0 ? (
            interviewQuestions.map((item, index) => (
              <li key={index} className="mb-2">
                <strong>{item.question}</strong>
                <p className="text-sm text-gray-600">Duration: {item.duration}</p>
              </li>
            ))
          ) : (
            <p>No questions available for this interview.</p>
          )}
        </ul>
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default QuestionListModal;
