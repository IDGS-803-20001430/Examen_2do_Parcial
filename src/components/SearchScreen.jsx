import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchScreen = () => {
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim() === '') {
      setError('Ingresa un término para buscar.');
    } else {
      setError('');
      navigate(`/items?search=${query}`);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="App-form text-center">
        <img src="https://www.pngall.com/wp-content/uploads/2016/05/Shopping-Bag-PNG-Pic.png" alt="Logo" className="mb-4" style={{ width: '100px' }} />
        <h1 className="display-4 mb-4 font-weight-bold">Bazar Online</h1>
        <div className="input-group mb-3">
          <input 
            type="text" 
            className="form-control" 
            placeholder="Buscar producto..." 
            aria-label="Buscar producto"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        {error && <div className="alert alert-warning mb-3">{error}</div>} 
        <button className="btn btn-info" onClick={handleSearch}>Buscar</button>
      </div>
    </div>
  );
};

export default SearchScreen;
