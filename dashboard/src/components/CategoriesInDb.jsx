import React, { useState, useEffect } from 'react';

function CategoriesInDb() {
    const [categories, setCategories] = useState({});

    useEffect(() => {
        fetch('http://localhost:3000/api/products')
            .then(res => res.json())
            .then(data => {
                setCategories(data.countByCategory);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div className="col-lg-6 mb-4">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h5 className="m-0 font-weight-bold text-gray-800">Categorías en Base de Datos</h5>
                </div>
                <div className="card-body">
                    <div className="row">
                        {Object.keys(categories).map((category, i) => {
                            return (
                                <div className="col-lg-6 mb-4" key={i}>
                                    <div className="card bg-dark text-white shadow">
                                        <div className="card-body">
                                            {category}: {categories[category]}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CategoriesInDb;
