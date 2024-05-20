// App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import TableComponent from './TableComponent';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/table" element={<TableComponent />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
        {/* Define other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
