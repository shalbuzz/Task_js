import { addNewData } from "./service.js";

const form = document.querySelector('#add-supplier-form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const productName = form['product_name'].value;
    const category = form['category'].value;
    const price = form['price'].value;
    const rating = form['rating'].value;

    
    if (!productName || !category || !price || !rating) {
        alert("Please fill in all fields.");
        return; 
    }
  

    if(price <=0  && rating <=0 ){
        alert("Price and Rating cannot be less than 0.");
        return; 
    }
  
    const newProduct = {
        title: productName,
        category: category,
        price: parseFloat(price),
        image: 'https://dummyimage.com/300x200/cccccc/000000&text=No+Image', 
        rating: {
            rate: parseFloat(rating),  
            count: 10 
        }
    };

 
    const isAdded = await addProduct(newProduct);

    if (isAdded) {
        alert("Product added successfully!");
        form.reset(); 
    } else {
        alert("Failed to add product.");
    }
});


async function addProduct(product) {
    try {
        const response = await addNewData('products', product);
        console.log("Product added:", response.data);   
        return true;
    } catch (error) {
        console.error("Error adding product:", error.response ? error.response.data : error);
        return false;
    }
}
