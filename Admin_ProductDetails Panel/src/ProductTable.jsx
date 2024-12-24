import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { deleteProduct, getProducts } from './productService';
import ProductForm from './ProductForm'; // Import ProductForm

function ProductTable() {
    const [products, setProducts] = useState([]);
    const [productToEdit, setProductToEdit] = useState(null); // State to hold the product that is being edited

    const fetchProducts = async () => {
        const data = await getProducts();
        setProducts(data);
    };

    const handleDelete = async (id) => {
        try {
            await deleteProduct(id);
            const updatedProducts = products.filter(product => product.id !== id);
            setProducts(updatedProducts); 
        } catch (error) {
            console.error('Error deleting the product', error);
        }
    };


    
    // Set the product to be edited
    const handleEdit = (product) => {
        setProductToEdit(product); // Set the product to edit in state
    };

    return (
        <>
            <button className='btn btn-success' onClick={fetchProducts}>Fetch Products</button>
            <h1>Product Table</h1>
            <table className="table table-striped table-bordered table-hover table-sm">
                <thead className="table-dark">
                    <tr>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Image</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>{product.quantity}</td>
                            <td>{product.price}</td>
                            <td>{product.category}</td>
                            <td>
                                {product.image ? (
                                    <img
                                        src={`/images/${product.image}`} 
                                        alt={product.name} 
                                        width="50" 
                                        height="50" 
                                    />
                                ) : (
                                    <span>No image available</span>
                                )}
                            </td>
                            <td>
                                <button className='btn btn-success' onClick={() => handleEdit(product)}>Edit</button>
                                <button className='btn btn-danger' onClick={() => handleDelete(product.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            {/* Pass the productToEdit to ProductForm */}
            {productToEdit && (
                <ProductForm product={productToEdit} />
            )}
        </>
    );
}

export default ProductTable;
