/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import Select from 'react-select';
import { useSnackbar } from 'notistack';
import usePackageStore from "../store/packageStore"; // Paketleri getirmek için import
import useInterviewStore from "../store/interviewStore"; // Interview oluşturma fonksiyonu için import

const Modal = ({ isOpen, onClose }) => {
  const { packages, fetchPackages } = usePackageStore(); // Paketleri ve fetch fonksiyonunu alıyoruz
  const { createInterview } = useInterviewStore(); // Interview oluşturma fonksiyonu
  const [interviewTitle, setInterviewTitle] = useState('');
  const [selectedPackages, setSelectedPackages] = useState([]);
  const [expireDate, setExpireDate] = useState('');
  const [canSkip, setCanSkip] = useState(false);
  const [showAtOnce, setShowAtOnce] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  // Modal açıldığında paketleri dinamik olarak çekiyoruz ve alanları sıfırlıyoruz
  useEffect(() => {
    if (isOpen) {
      fetchPackages();
      setInterviewTitle('');
      setSelectedPackages([]);
      setExpireDate('');
      setCanSkip(false);
      setShowAtOnce(false);
    }
  }, [isOpen, fetchPackages]);

  const handleChange = (selectedOptions) => {
    setSelectedPackages(selectedOptions);
  };

  const handleDateChange = (e) => {
    setExpireDate(e.target.value);
  };

  const toggleCanSkip = () => {
    setCanSkip(!canSkip);
  };

  const toggleShowAtOnce = () => {
    setShowAtOnce(!showAtOnce);
  };

  const handleSave = async () => {
    const newInterview = {
      title: interviewTitle,
      packages: selectedPackages.map(pkg => pkg.value), // Package ID'leri
      expireDate,
      canSkip,
      showAtOnce,
      status: 'Published'
    };

    try {
      await createInterview(newInterview); // Yeni mülakatı backend’e gönder
      onClose();
      enqueueSnackbar('Interview saved successfully!', { variant: 'success' });
    } catch (error) {
      console.error("Error creating interview:", error);
      enqueueSnackbar('Failed to save interview.', { variant: 'error' });
    }
  };

  if (!isOpen) return null;

  // Gelen paketleri Select bileşeni için uygun formatta dönüştürüyoruz
  const packageOptions = packages.map(pkg => ({
    value: pkg._id, // Backend'den gelen paket ID'si
    label: pkg.packageName,
  }));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        <h2 className="text-xl font-bold mb-4">Add New Interview</h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Interview Title</label>
          <input 
            type="text" 
            value={interviewTitle}
            onChange={(e) => setInterviewTitle(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
            placeholder="Enter title"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Select Packages</label>
          <Select 
            isMulti
            value={selectedPackages}
            onChange={handleChange}
            options={packageOptions} // Dinamik paket listesi
            className="basic-multi-select"
            classNamePrefix="select"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Expire Date</label>
          <input 
            type="date" 
            value={expireDate}
            onChange={handleDateChange}
            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-start items-center mb-4 space-x-4">
          <div className="flex items-center">
            <span className="mr-2 text-sm font-medium">Can Skip</span>
            <button 
              onClick={toggleCanSkip} 
              className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200 focus:outline-none ${canSkip ? 'bg-blue-500' : 'bg-gray-300'}`}
            >
              <span className={`absolute w-6 h-6 bg-white rounded-full shadow transition-transform duration-200 ${canSkip ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>
          <div className="flex items-center">
            <span className="mr-2 text-sm font-medium">Show at Once</span>
            <button 
              onClick={toggleShowAtOnce} 
              className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200 focus:outline-none ${showAtOnce ? 'bg-blue-500' : 'bg-gray-300'}`}
            >
              <span className={`absolute w-6 h-6 bg-white rounded-full shadow transition-transform duration-200 ${showAtOnce ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>
        </div>

        <div className="flex justify-end">
          <button 
            onClick={onClose} 
            className="text-gray-500 mr-4"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave} 
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
          >
            Save
          </button>
        </div>
        
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition duration-200"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default Modal;
