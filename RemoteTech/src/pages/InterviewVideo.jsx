import  { useState } from "react";
//import { useParams } from "react-router-dom"; // URL'deki id'yi almak için
import { useSnackbar } from 'notistack';
import { useNavigate } from "react-router-dom"; // Yönlendirme için import

const InterviewVideo = () => {
  //const { id } = useParams(); // Video ID'sini URL'den alıyoruz
  const [note, setNote] = useState("");
  const [Status, setStatus] = useState(false); // Status toggle için state
  const {enqueueSnackbar}= useSnackbar();
  const navigate = useNavigate();

  // Toggle fonksiyonu
  const toggleCanSkip = () => {
    setStatus(!Status);
  };

  const handleSave = () => {
     // Save işleminden sonra alert ver
  enqueueSnackbar('Status saved successfully!',{variant:'success'});
  navigate("/video-collection");
    // Kaydetme işlemleri burada yapılabilir
    
  };

  return (
    <div className="flex">
      <div className="p-6 bg-gray-100 min-h-screen w-full">
        <div className="bg-white shadow-md rounded-md p-6 max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-center">Backend Interview Video Collection</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Video Alanı */}
            <div className="flex justify-center items-center bg-gray-200 h-64">
              <p className="text-4xl text-gray-500">▶️</p>
            </div>
            
            {/* Sağ Taraf Not ve Bilgiler */}
            <div>
              <div className="border p-4 bg-gray-100 h-64 mb-4">
                {/* Not Alanı */}
                <p className="text-lg">Interview Notes...</p>
              </div>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Note...."
                className="border p-2 w-full h-24 rounded"
              ></textarea>
            </div>
          </div>

          {/* Toggle Switches Sol Alt Köşede */}
          <div className="flex justify-between items-center mt-6">
            <div className="flex items-center">
              <span className="mr-2 text-sm font-medium">Status</span>
              <button 
                onClick={toggleCanSkip} 
                className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200 focus:outline-none ${Status ? 'bg-blue-500' : 'bg-gray-300'}`}
              >
                <span className={`absolute w-6 h-6 bg-white rounded-full shadow transition-transform duration-200 ${Status ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewVideo;