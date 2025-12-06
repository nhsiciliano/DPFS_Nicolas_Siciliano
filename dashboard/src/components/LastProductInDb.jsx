import React, { useState, useEffect } from 'react';

function LastProductInDb() {
    const [lastProduct, setLastProduct] = useState(null);

    useEffect(() => {
        // Fetch last product logic
        // Strategy: Get total count first or page size logic.
        // Or simply: Fetch list with limit 1, order DESC (if API supported it).
        // Since our API currently does not support sorting params explicitly, we might need to fetch all (expensive) or fetch last page.
        // Let's assume for now we fetch the last page.
        // First fetch to get count
        fetch('http://localhost:3000/api/products')
            .then(response => response.json())
            .then(data => {
                let totalProd = data.count;
                // If we want the very last one, and page limit is 10.
                let lastPage = Math.ceil(totalProd / 10);

                return fetch(`http://localhost:3000/api/products?page=${lastPage}`);
            })
            .then(response => response.json())
            .then(data => {
                // The last product should be the last in the array of the last page.
                let products = data.products;
                let lastOne = products[products.length - 1];
                setLastProduct(lastOne);
            })
            .catch(e => console.log(e));
    }, [])

    return (
        <div className="col-lg-6 mb-4">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h5 className="m-0 font-weight-bold text-gray-800">Último producto creado: {lastProduct ? lastProduct.name : 'Cargando...'}</h5>
                </div>
                <div className="card-body">
                    <div className="text-center">
                        {lastProduct &&
                            <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{ width: 40 + 'rem' }} src={`http://localhost:3000${lastProduct.imageUrl || '/img/default-product.png'}`} alt={lastProduct.name} />
                        }
                    </div>
                    <p>{lastProduct ? lastProduct.description : ''}</p>
                    <a className="btn btn-danger" target="_blank" rel="nofollow" href={lastProduct ? lastProduct.detail : '/'}>Ver detalle del producto</a>
                </div>
            </div>
        </div>
    )
}

export default LastProductInDb;
