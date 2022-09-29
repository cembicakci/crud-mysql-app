import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Warehouse from './components/Warehouse';
import WarehouseDetail from './components/WarehouseDetail';
import './App.css';

function App() {

  return (
    <div>

      <Router>

        <Routes>
          <Route path="/" element={<Warehouse />} />
          <Route path="/warehouse/:id" element={<WarehouseDetail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
