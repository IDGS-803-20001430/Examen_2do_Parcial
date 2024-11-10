import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchScreen from './components/SearchScreen';
import ResultsScreen from './components/ResultsScreen';
import ProductDetail from './components/ProductDetail';
import SalesList from './components/SalesList';

const App = () => {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<SearchScreen />} />
          <Route path="/items" element={<ResultsScreen />} />
          <Route path="/item/:id" element={<ProductDetail />} />
          <Route path="/sales" element={<SalesList />} /> {/* Nueva ruta para compras registradas */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
