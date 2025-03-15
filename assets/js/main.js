import { getAllData } from "./service.js";

async function getProductsCards(){
   try {
    const spinner = document.querySelector('.loader');
    spinner.style.display = 'block';
    const products = await getAllData('products');
    products.forEach(product => {
        const container  = document.querySelector('.row');
        const productImage = product.image ? product.image : 'https://dummyimage.com/300x200/cccccc/000000&text=No+Image';
        container.innerHTML += `
              <div class="col-md-3">
                  <div class="card" data-id="${product.id}">
                      <img src= "${productImage}" class="card-img-top" alt="${product.title}">
                      <div class="card-body">
                          <h5 class="card-title">${product.title}</h5>
                          <p class="card-text">${product.category}</p>
                      </div>
                  </div>
              </div>
             `
         
    });
   setTimeout(() => {
        spinner.style.display = 'none';
    }, 100);  

    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', (e) => {
            const productId = card.getAttribute('data-id');
            window.location.href = `./detail.html?id=${productId}`;
        });
    });
    
   } catch (error) {
     console.log(error);
     spinner.style.display = 'none';
     
   }
}

getProductsCards();