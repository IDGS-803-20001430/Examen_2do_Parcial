import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../servicios/servicios';

const SalesList = () => {
  const navigate = useNavigate();
  const [compras, setCompras] = useState([]);


  const obtenerComprasRealizadas = async () => {
    try {
      const data = await api.getCompras();
      setCompras(data);   
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    obtenerComprasRealizadas();

  }, []);


  const handleExit = () => {
    navigate('/');
  };

  return (
    <div className="sales-list-container">
      <h2 className="text-center font-weight-bold">Compras Registradas</h2>
      <ul className="list-group">
        {compras.map((compra) => (
          <li key={compra.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{compra.nombreProducto}</strong>
              <p className="text-muted">Fecha: {compra.fecha}</p>
            </div>
            <span>{compra.costoUnitario}</span>
          </li>
        ))}
      </ul>
      <div className="text-center mt-4">
        <button className="btn btn-info" onClick={handleExit}>Salir</button>
      </div>
    </div>
  );
};

export default SalesList;
