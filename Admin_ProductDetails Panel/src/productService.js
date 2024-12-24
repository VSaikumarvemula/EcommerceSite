import axios from "axios";

export const saveProduct = async (jsonPayload) => {
    try {
        const response = await axios.post("http://localhost:9999/api/v1/save", jsonPayload);
        console.log("Product response:", response);
        alert("Saved successfully");
    } catch (error) {
        console.log("Error:", error);
        alert("Failed to save the product");
    }
};


export const getProducts = async () => {
    try {
        const response = await axios.get("http://localhost:9999/api/v1/products");
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching products", error);
        return [];
    }
};



export const deleteProduct = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:9999/api/v1/deletebyid/${id}`);
        return response;
    } catch (error) {
        console.error('Error deleting product', error);
    }
};

export const updateProduct = async (id, jsonPayload) => {
  try {
      const response = await axios.put(`http://localhost:9999/api/v1/update/${id}`, jsonPayload);
      alert("Product updated successfully");
      return response;
  } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product");
  }
};

