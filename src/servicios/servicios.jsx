const endPoint = import.meta.env.VITE_REACT_API_URL;

const getBusquedaProductos = async (search = '') => {
    try {
        const response = await fetch(`${endPoint}items?search=${search}`);
        const data = await response.json();
        if (response.ok) {
            return data; 
        } else {
            throw new Error(data.mensaje || 'Error al obtener productos');
        }
    } catch (error) {
        console.error(error);
        throw new Error(error.message || 'Error al obtener productos');
    }
};

const getDetallesProductos = async (id) => {
    try {
        const response = await fetch(`${endPoint}item/${id}`);
        const data = await response.json();
        console.log("-----------------------------------------------------------");
        
        console.log(data);
        
        if (response.ok) {
            return data; 
        } else {
            throw new Error(data.mensaje || 'Error al obtener detalles del producto');
        }
    } catch (error) {
        console.error(error);
        throw new Error(error.message || 'Error al obtener detalles del producto');
    }
};

const agregarCompra = async (saleData) => {
    try {
        const response = await fetch(`${endPoint}addSale`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(saleData)
        });

        const data = await response.json();

        if (response.ok && data.estatus === "success") {
            console.log(data);
            return data.estatus;
        } else {
            throw new Error(data.mensaje || 'Error al realizar la compra');
        }
    } catch (error) {
        console.error(error);
        throw new Error(error.message || 'Error al realizar la compra');
    }
};

const getCompras = async () => {
    try {
        const response = await fetch(`${endPoint}sales`);
        const data = await response.json();
        console.log(data);
        if (response.ok && data.estatus === "success") {
            console.log(data.data);
            return data.data; 
        } else {
            throw new Error(data.mensaje || 'Error al obtener las compras');
        }
    } catch (error) {
        console.error(error);
        throw new Error(error.message || 'Error al obtener las compras');
    }
};

export default {
    getBusquedaProductos,
    getDetallesProductos,
    agregarCompra,
    getCompras
};
