import React, { useRef, useEffect } from "react";
import { saveProduct, updateProduct } from "./productService";

function ProductForm({ product }) {
    const nameref = useRef();
    const quantityref = useRef();
    const priceref = useRef();
    const categoryref = useRef();
    const imageref = useRef();

    useEffect(() => {
        // Pre-fill form fields with existing product data if available
        if (product) {
            nameref.current.value = product.name;
            quantityref.current.value = product.quantity;
            priceref.current.value = product.price;
            categoryref.current.value = product.category;
        }
    }, [product]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const jsonpayload = {
            name: nameref.current.value,
            quantity: parseInt(quantityref.current.value, 10),
            price: parseFloat(priceref.current.value),
            category: categoryref.current.value,
            image: imageref.current.files[0]?.name, // Only set image if a file is chosen
        };
       
        
        if (product) {
            // If product is being edited, update it
            updateProduct(product.id, jsonpayload);
        } else {
            // Otherwise, save the new product
            saveProduct(jsonpayload);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <label>Product Name:</label>
                <input type="text" ref={nameref} required />
                <br /><br />
                <label>Product Quantity:</label>
                <input type="number" ref={quantityref} required />
                <br /><br />
                <label>Product Price:</label>
                <input type="number" ref={priceref} required />
                <br /><br />
                <label>Product Category:</label>
                <input type="text" ref={categoryref} required />
                <br /><br />
                
                <label>Product Image:</label>
                <input type="file" ref={imageref} />
                <br /><br />
                
                <button type="submit">{product ? "Update Product" : "Submit"}</button>
            </form>
        </>
    );
}

export default ProductForm;
