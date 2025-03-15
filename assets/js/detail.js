import { getAllData } from "./service.js";

async function getProductDetails() {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id");

    if (!productId) {
        console.error("Product ID not found in URL");
        return;
    }

    try {
        const spinner = document.querySelector('.loader');
        spinner.style.display = 'block';

        const products = await getAllData("products");
        const product = products.find(p => p.id == productId);

        if (!product) {
            console.error("Product not found");
            document.querySelector('.product-details').innerHTML = "<p>Product not found!</p>";
            return;
        }

        document.querySelector('.product-details').innerHTML = `
            <h2>${product.title}</h2>
            <p><strong>Price:</strong> $${product.price}</p>
            <p><strong>Category:</strong> ${product.category}</p>
            <p><strong>Rating:</strong> ${product.rating.rate} ⭐</p>
            <button id="back-btn">Go Back</button>
        `;
        document.getElementById("back-btn").addEventListener("click", function() {
            window.history.back();
        });
        setTimeout(() => {
            spinner.style.display = 'none';
        }, 100);  
    } catch (error) {
        console.error("Error fetching product details:", error);
        spinner.style.display = 'none';
    }
}


getProductDetails();
