
import React, { useState, useEffect } from 'react';
import SmallCard from './SmallCard';
import LastProductInDb from './LastProductInDb';
import CategoriesInDb from './CategoriesInDb';
import ProductList from './ProductList';

function ContentRowTop() {
    // Estados para las métricas
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalCategories, setTotalCategories] = useState(0);

    // Estados para Last Created y Categories, etc.
    // ...

    useEffect(() => {
        // Fetch Users Limit
        fetch('/api/users')
            .then(res => res.json())
            .then(data => {
                console.log('Data Users:', data);
                setTotalUsers(data.count || data.users.length || 0);
            })
            .catch(err => console.error('Error fetching users:', err));

        // Fetch Products
        fetch('/api/products')
            .then(res => res.json())
            .then(data => {
                console.log('Data Products:', data);
                setTotalProducts(data.count || 0);
                // Asumiendo que countByCategory es un objeto, obtenemos sus claves
                setTotalCategories(data.countByCategory ? Object.keys(data.countByCategory).length : 0);
            })
            .catch(err => console.error('Error fetching products:', err));
    }, []);

    let productMetric = {
        title: 'Total de Productos',
        color: 'primary',
        count: totalProducts,
        icon: 'fa-clipboard-list'
    }

    let userMetric = {
        title: 'Total de Usuarios',
        color: 'success',
        count: totalUsers,
        icon: 'fa-user-check'
    }

    let categoryMetric = {
        title: 'Total de Categorías',
        color: 'warning',
        count: totalCategories,
        icon: 'fa-folder'
    }

    let cartProps = [productMetric, userMetric, categoryMetric];

    return (
        <React.Fragment>
            <div className="container-fluid">
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">App Dashboard</h1>
                </div>

                {/* Content Row Movies*/}
                <div className="row">
                    {cartProps.map((movie, i) => {
                        return <SmallCard {...movie} key={i} />
                    })}
                </div>

                <div className="row">
                    {/* Last Product in DB */}
                    <LastProductInDb />

                    {/* Categories in DB */}
                    <CategoriesInDb />
                </div>

                {/* Product List */}
                <ProductList />

            </div>
        </React.Fragment>
    )

}
export default ContentRowTop;

