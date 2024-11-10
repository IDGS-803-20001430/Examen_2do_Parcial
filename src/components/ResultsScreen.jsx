import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import api from '../servicios/servicios';

const ResultsScreen = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('search');
  const navigate = useNavigate();

  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);
  const [cantidadRegistros, setCantidadRegistros] = useState(0);
  const [paginaActual, setPaginaActual] = useState(0);
  const productosPorPagina = 5;
  
  const contenedorRef = useRef(null);

  const handleProductClick = (id) => {
    navigate(`/item/${id}`);
  };

  const handleSearchInputChange = (event) => {
    console.log(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      const searchValue = event.target.value.trim();
      if (searchValue) {
        navigate(`/items?search=${searchValue}`);
      }
    }
  };

  const obtenerProductosBusqueda = async (valorBuscado) => {
    try {
      const data = await api.getBusquedaProductos(valorBuscado);
      setProductos(data.products);
      setCantidadRegistros(data.totalResults);
      setPaginaActual(0);
    } catch (error) {
      console.log(error);
      setError("Ocurrió un error al obtener los productos.");
    }
  };

  useEffect(() => {
    if (query) {
      obtenerProductosBusqueda(query);
    }
  }, [query]);

  const handleLogoClick = () => {
    navigate('/sales');
  };

  const productosPaginados = productos.slice(
    paginaActual * productosPorPagina,
    (paginaActual + 1) * productosPorPagina
  );

  const handlePaginaAnterior = () => {
    if (paginaActual > 0) {
      setPaginaActual(paginaActual - 1);
      contenedorRef.current.scrollTop = 0;
    }
  };

  const handlePaginaSiguiente = () => {
    if ((paginaActual + 1) * productosPorPagina < productos.length) {
      setPaginaActual(paginaActual + 1);
      contenedorRef.current.scrollTop = 0;
    }
  };

  return (
    <div className="results-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <img
          src="https://www.pngall.com/wp-content/uploads/2016/05/Shopping-Bag-PNG-Pic.png"
          alt="Logo"
          className="mb-4"
          style={{ width: '50px', cursor: 'pointer' }}
          onClick={handleLogoClick}
        />
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar más productos..."
            aria-label="Buscar producto"
            onChange={handleSearchInputChange}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>

      <div className="mb-4">
        <h3>Resultados de la búsqueda de: <strong>{query}</strong></h3>
        <p className="text-muted"> Total Registros: {cantidadRegistros} </p>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div
        className="row"
        style={{ maxHeight: '400px', overflowY: 'auto' }}
        ref={contenedorRef}
      >
        {productosPaginados.map(product => (
          <div className="col-12 mb-4" key={product.id} onClick={() => handleProductClick(product.id)} style={{ cursor: 'pointer' }}>
            <div className="d-flex align-items-center">
              <div className="col-4">
                <img
                  src={product.images ? product.images[0] : 'https://cdn-icons-png.freepik.com/256/17018/17018802.png?semt=ais_hybrid'}
                  alt={product.title}
                  className="rounded-circle"
                  style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.src = 'https://cdn-icons-png.freepik.com/256/17018/17018802.png?semt=ais_hybrid';
                  }}
                />
              </div>
              <div className="col-8">
                <div className="row">
                  <div className="col-12">
                    <h5>{product.title}</h5>
                  </div>
                  <div className="col-12">
                    <p className="text-muted">{product.category}</p>
                  </div>
                  <div className="col-12">
                    <p>{product.description}</p>
                  </div>
                  <div className="col-12 d-flex justify-content-between align-items-center">
                    <span>{product.price}</span>
                    <span>
                      {'★'.repeat(product.rating)}{'☆'.repeat(5 - product.rating)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-center mt-3">
        <button
          className="btn btn-outline-primary mx-2"
          onClick={handlePaginaAnterior}
          disabled={paginaActual === 0}
        >
          Anterior
        </button>
        <button
          className="btn btn-outline-primary mx-2"
          onClick={handlePaginaSiguiente}
          disabled={(paginaActual + 1) * productosPorPagina >= productos.length}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default ResultsScreen;
