import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';

import Dashboard from './pages/dashboard.jsx';
import CreateShipment from './pages/createShipment.jsx';
import ShipmentDetails from './pages/shipmentDetails.jsx';

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Dashboard />} />

        <Route
          path="/create"
          element={<CreateShipment />}
        />

        <Route
          path="/shipments/:id"
          element={<ShipmentDetails />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;