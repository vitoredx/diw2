function fetchProducts() {
  fetch('https://diwserver.vps.webdock.cloud/products')
    .then(response => response.json())
    .then(data => {
      const cardsContainer = document.getElementById('cards-container');

      cardsContainer.innerHTML = '';

      data.products.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('col-md-4', 'mb-4'); 
        card.innerHTML = `
          <div class="card">
            <img src="${product.image}" class="card-img-top" alt="Imagem do Produto">
            <div class="card-body">
              <h5 class="card-title">${product.title}</h5>
              <p class="card-text">Avaliação: ${product.rating.rate}</p>
              <p class="card-text">Preço: R$${product.price}</p>
              <a href="#" class="btn btn-primary" data-product-id="${product.id}">Saiba Mais</a>
            </div>
          </div>
        `;

        const saibaMaisButton = card.querySelector('.btn-primary');
        saibaMaisButton.addEventListener('click', () => {
          const productId = saibaMaisButton.getAttribute('data-product-id');
          redirectToProductPage(productId);
        });

        cardsContainer.appendChild(card);
      }); 
    });
}


function redirectToProductPage(productId) {

  window.location.href = `product.html?id=${productId}`;
}


function filterProducts(keyword) {
  fetch('https://diwserver.vps.webdock.cloud/products')
    .then(response => response.json())
    .then(data => {
      const filteredProducts = data.products.filter(product => {
        const title = product.title.toLowerCase();
        return title.includes(keyword.toLowerCase());
      });

      const cardsContainer = document.getElementById('cards-container');
      cardsContainer.innerHTML = '';

      filteredProducts.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('col-md-4');
        card.innerHTML = `
          <div class="card">
            <img src="${product.image}" class="card-img-top" alt="Imagem do Produto">
            <div class="card-body">
              <h5 class="card-title">${product.title}</h5>
              <p class="card-text">Avaliação: ${product.rating.rate}</p>
              <p class="card-text">Preço: R$${product.price}</p>
              <a href="#" class="btn btn-primary" data-product-id="${product.id}">Saiba Mais</a>
            </div>
          </div>
        `;

        const saibaMaisButton = card.querySelector('.btn-primary');
        saibaMaisButton.addEventListener('click', () => {
          const productId = saibaMaisButton.getAttribute('data-product-id');
          redirectToProductPage(productId);
        });

        cardsContainer.appendChild(card);
      });
   
   
    })
}

function setupFilterButton() {
  const filterButton = document.getElementById('filter-button');
  filterButton.addEventListener('click', () => {
    const keywordInput = document.getElementById('filter-input');
    const keyword = keywordInput.value.trim();

    if (keyword !== '') {
      filterProducts(keyword);
    } else {
      fetchProducts();
    }
  });
}

window.addEventListener('load', () => {
  fetchProducts();
  setupFilterButton();
});