import "./App.css";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import CustomerList from './components/CustomerList';
import TrainingList from './components/TrainingList';

function App() {
  return (
      <div className="App">
        <nav>
          <Link to="/">Home</Link>
          <Link to="/CustomerList">Customers</Link>
          <Link to="/TrainingList">Trainings</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/CustomerList" element={<CustomerList />} />
          <Route path="/TrainingList" element={<TrainingList />} />
        </Routes>
      </div>
  );
}

export default App;
