// src/App.js

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminPanel from './pages/AdminPage';
import InterviewList from './pages/InterviewList';
import PackageTitle from './pages/PackageTitle';
import ManagePackages from './components/ManagePackages';
import VideoCollection from './pages/VideoCollection';
import InterviewVideo from './pages/InterviewVideo';
import LoginPage from './pages/LoginPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<AdminPanel />}>
          <Route path="/interview-list" element={<InterviewList />} />
          <Route path="/create-package" element={<PackageTitle />} />
          <Route path="/manage-question-package" element={<ManagePackages />} />
          <Route path="/video-collection" element={<VideoCollection />} />
          <Route path="/interview-video/:id" element={<InterviewVideo />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
