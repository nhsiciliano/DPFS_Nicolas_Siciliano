import React, { useState, useEffect } from 'react';

function ProductList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Fetch ALL products? Or just first page?
        // Ideally we should implement pagination here too.
        // For simplicity, let's just show the first page or everything if we iterate pages.
        // Let's show first page for now.
        fetch('http://localhost:3000/api/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data.products);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <React.Fragment>
            {/*<!-- PRODUCTS LIST -->*/}
            <h1 className="h3 mb-2 text-gray-800">Todos los productos</h1>

            {/*<!-- DataTales Example -->*/}
            <div className="card shadow mb-4">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Nombre</th>
                                    <th>Descripción</th>
                                    <th>Categoría</th>
                                    <th>Colores</th>
                                    <th>Link</th>
                                </tr>
                            </thead>
                            <tfoot>
                                <tr>
                                    <th>Id</th>
                                    <th>Nombre</th>
                                    <th>Descripción</th>
                                    <th>Categoría</th>
                                    <th>Colores</th>
                                    <th>Link</th>
                                </tr>
                            </tfoot>
                            <tbody>
                                {products.map((product, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{product.id}</td>
                                            <td>{product.name}</td>
                                            <td>{product.description}</td>
                                            <td>{product.category ? product.category.name : 'Sin categoría'}</td>
                                            <td>
                                                <ul>
                                                    {product.colors && product.colors.map((color, idx) => <li key={idx}>{color.name}</li>)}
                                                </ul>
                                            </td>
                                            <td><a href={product.detail} target="_blank" rel="noopener noreferrer">Ver</a></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
export default ProductList;
