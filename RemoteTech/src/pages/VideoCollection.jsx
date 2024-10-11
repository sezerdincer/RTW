import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Yönlendirme için kullanıyoruz

const VideoCollection = () => {
  const navigate = useNavigate(); // Yönlendirme fonksiyonu
  const [videos] = useState([
    { id: 1, name: "Abdulkadir Katıağ" },
    { id: 2, name: "Yıldız Azizi" },
    { id: 3, name: "Ahmet Demirezen" },
    { id: 4, name: "Murat Efe Çetin" },
    { id: 5, name: "Taha Zeytun" },
    { id: 6, name: "Seda Müritsoy" }
  ]);

  const handleVideoClick = (id) => {
    navigate(`/interview-video/${id}`); // Video tıklanınca yönlendirme
  };

  return (
    <div className="flex">
      <div className="p-6 bg-gray-100 min-h-screen w-full">
        <div className="bg-white shadow-md rounded-md p-6 max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-center">Backend Interview Video Collection</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <div
                key={video.id}
                className="border-2 rounded-lg p-4 cursor-pointer transition-all border-gray-300"
                onClick={() => handleVideoClick(video.id)} // Tıklayınca çalışacak fonksiyon
              >
                <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
                  <button className="text-gray-500 text-4xl">▶️</button>
                </div>
                <p className="mt-2 text-center font-semibold text-gray-800">{video.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCollection;
