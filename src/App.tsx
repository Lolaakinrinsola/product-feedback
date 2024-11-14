import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EditFeedback from './pages/EditFeedback';
import FeedbackDetail from './pages/FeedbackDetail';
import NewFeedback from './pages/NewFeedback';
import Roadmap from './pages/Roadmap';
import Suggestions from './pages/Suggestions';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Suggestions/>} />
        <Route path="/roadmap" element={<Roadmap/>} />
        <Route path="/feedback/:id" element={<FeedbackDetail/>} />
        <Route path="/edit-feedback/:id" element={<EditFeedback/>} />
        <Route path="/new-feedback" element={<NewFeedback/>} />
      </Routes>
    </Router>
  );
}

export default App;
