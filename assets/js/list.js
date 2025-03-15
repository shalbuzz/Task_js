import { getAllData } from "./service.js";
import { deleteData } from "./service.js";

async function getProducts(){
    const containers = document.querySelector('.containers');
    
    try {
        const spinner = document.querySelector('.loader');
        spinner.style.display = 'block';

        const products = await getAllData('products');
        
        containers.innerHTML = `
        <table class="table">
            <thead>
                <tr>
                    <th>Product ID</th>
                    <th>Product Title</th>
                    <th>Product Price</th>
                    <th>Product Category</th>
                    <th>Product Rating</th>
                    <th>Detail</th>
                    <th>Delete Product</th>
                </tr>
            </thead>
            <tbody class="table-body">
            </tbody>
        </table>
    `;

    const tbody = document.querySelector('tbody');
    products.forEach(product => {
        
        tbody.innerHTML += `
            <tr>
                <td>${product.id}</td>
                <td>${product.title}</td>
                <td>${product.price}</td>
                <td>${product.category}</td>
                <td>${product.rating.rate}</td>
                <td><a href="detail.html?id=${product.id}">Go to detail</a></td>
                <td><button class='delete-btn' data-id="${product.id}">Delete</button></td>
            </tr>
        `;
    });
    setTimeout(() => {
        spinner.style.display = 'none';
    }, 100);  

    const deleteBtns = document.querySelectorAll('.delete-btn');
    deleteBtns.forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.preventDefault(); 
            const productId = e.target.getAttribute('data-id');
            console.log("Deleting product with ID:", productId);
            const success = await deleteProduct(productId);
            if (success) {
                e.target.closest('tr').remove(); 
            }
        });
    });
       
    } catch (error) {
        spinner.style.display = 'none';

        console.log(error);
        
    }
}

async function deleteProduct(productId) {
    console.log(`Trying to delete product with ID: ${productId}`);
    if (!productId) {
        console.error("Product ID is undefined!");
        return false;
    }

    const success = await deleteData('products', productId);  
    if (success) {
        console.log(`Product with ID ${productId} deleted successfully`);
        return true;
    } else {
        console.error(`Failed to delete product with ID ${productId}`);
        return false;
    }
}



getProducts();





