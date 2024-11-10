import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../servicios/servicios';
import Swal from 'sweetalert2';


const ProductDetails = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [detalleProducto, setDetalleProducto] = useState(null);
  const { id } = useParams();

  const obtenerDetallesProductoBusqueda = async (idProducto) => {
    try {
      const data = await api.getDetallesProductos(idProducto);
      setDetalleProducto(data);   
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    obtenerDetallesProductoBusqueda(id);
  }, [id]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchEnter = (event) => {
    if (event.key === 'Enter') {
      navigate(`/items?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleLogoClick = () => {
    navigate('/sales');
  };

  const handlePurchase = () => {
    Swal.fire({
      title: '¿Estás seguro de que quieres comprar este producto?',
      text: "La cantidad será 1 por defecto.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, comprar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        const cantidad = 1;
        const datosCompra = {
          productId: detalleProducto.id,
          amount: cantidad,
        };
        Swal.fire('¡Compra finalizada!', 'Tu compra ha realizada.', 'success');
        realizarCompra(datosCompra);
        navigate('/sales'); 
      }
    });
  };

  const realizarCompra = async (datosComtra) => {
    try {
      const response = await api.agregarCompra(datosComtra);
      if (response === 'success') {
        return true;
      } else {
        throw new Error(response.data.mensaje || 'Error al realizar la compra');
      }
    } catch (error) {
      throw error.response ? error.response.data : new Error('Error al realizar la compra');
    }
  };

  if (!detalleProducto) {
    return <div>Cargando detalles del producto...</div>;
  }

  return (
    <div className="product-details-container">
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
            placeholder="Buscar productos..."
            aria-label="Buscar producto"
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyDown={handleSearchEnter}
          />
        </div>
      </div>

      <div className="d-flex justify-content-between mb-4">
        {detalleProducto.images ? (
          Array.from({ length: 3 }).map((_, index) => {
            const imgSrc = detalleProducto.images[index] 
              ? detalleProducto.images[index] 
              : 'https://cdn-icons-png.freepik.com/256/17018/17018802.png?semt=ais_hybrid';

            return (
              <div key={index} className="circle-image-container">
                <img
                  src={imgSrc}
                  alt={`Imagen ${index + 1}`}
                  className="rounded-circle"
                  style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.src = 'https://cdn-icons-png.freepik.com/256/17018/17018802.png?semt=ais_hybrid';
                  }}
                />
              </div>
            );
          })
        ) : (
          <p>No hay imágenes disponibles para este producto.</p>
        )}
      </div>

      <div className="product-name mb-2 text-center">
        <h3>{detalleProducto.title}</h3>
      </div>

      <div className="product-category mb-4 text-center">
        <p className="text-muted">{detalleProducto.category}</p>
      </div>

      <div className="product-description mb-4">
        <p>{detalleProducto.description}</p>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <span>{detalleProducto.price}</span>
        <span>
          {'★'.repeat(detalleProducto.rating)}{'☆'.repeat(5 - detalleProducto.rating)}
        </span>
      </div>

      <div className="d-flex justify-content-center">
        <button className="btn btn-info" onClick={handlePurchase}>Comprar</button>
      </div>
    </div>
  );
};

export default ProductDetails;
