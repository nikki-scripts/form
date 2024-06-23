import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import EventRegistrationForm from './components/EventRegistrationForm';
import SurveyForm from './components/SurveyForm';
import JobApplicationForm from './components/JobApplicationForm';

function App() {
  return (
    <Router>
    <nav>
      <ul>
        <li><Link to='/form'> Level 1 </Link></li>
        <li><Link to='/form/level2'> Level 2 </Link></li>
        <li><Link to='/form/level3'> Level 3 </Link></li>
      </ul>
    </nav>
    <Routes>
      <Route
      path="/form"
      element={<EventRegistrationForm/>}
      />
      <Route
      path="/form/level3"
      element={<SurveyForm/>}
      />
      <Route
      path="/form/level2"
      element={<JobApplicationForm/>}
      />
    </Routes>

    </Router>
  );
}

export default App;
