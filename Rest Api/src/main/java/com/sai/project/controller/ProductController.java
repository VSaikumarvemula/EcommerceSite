package com.sai.project.controller;

import java.util.List; 
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "*")


public class ProductController {

	@Autowired ProductRepository productRepo;
	
	@PostMapping("/save")
	public ResponseEntity<Product> saveProduct(@RequestBody Product product){
		
		Product pro = productRepo.save(product);
		
		return  ResponseEntity.status(HttpStatus.CREATED)
                .header("saved", "saved success fully")
                .body(pro);
	}
	
	
	@GetMapping("/products")
	public ResponseEntity<?> getAllProducts(){
		List<Product> pro = productRepo.findAll();
		return ResponseEntity.status(HttpStatus.OK)
							 .header("status", "products")
							 .body(pro);
	}
	
	@DeleteMapping("/deletebyid/{id}")
	public ResponseEntity<?> deleteById(@PathVariable Long id){
		Optional<Product> pro = productRepo.findById(id);
		if(pro.isPresent()) {
			productRepo.deleteById(id);
			return ResponseEntity.noContent().build();
		}
		else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					 .header("status", "not")
					 .body("not found");
		}
	}
	
	 // Update product by ID
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable Long id, @RequestBody Product updatedProduct) {
        Optional<Product> existingProduct = productRepo.findById(id);

        if (existingProduct.isPresent()) {
            Product product = existingProduct.get();

            // Update the fields of the existing product with new values
            product.setName(updatedProduct.getName());
            product.setQuantity(updatedProduct.getQuantity());
            product.setPrice(updatedProduct.getPrice());
            product.setCategory(updatedProduct.getCategory());
            product.setImage(updatedProduct.getImage());

            // Save the updated product
            productRepo.save(product);

            return ResponseEntity.status(HttpStatus.OK)
                                 .header("status", "updated")
                                 .body("Product updated successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                 .header("status", "not found")
                                 .body("Product not found");
        }
    }
	
	
	
	
	
}
