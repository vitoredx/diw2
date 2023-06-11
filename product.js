function fetchProductDetails(productId) {
    fetch(`https://diwserver.vps.webdock.cloud/products/${productId}`)
      .then(response => response.json())
      .then(product => {
        const productDetailsContainer = document.getElementById('product-details');

        productDetailsContainer.innerHTML = '';

        const productHTML = `
            <div class="card">
              <img src="${product.image}" class="card-img-top product-image mx-auto" alt="${product.title}">
              <div class="card-body">
                <h5 class="card-title">${product.title}</h5>
                <p class="card-text"> <strong>Descrição:</strong> ${product.description}</p>
                <p class="card-text"><strong>Preço:</strong> R$${product.price}</p>
                <p class="card-text"><strong>Categoria:</strong> ${product.category}</p>
                <p class="card-text"><strong>Avaliação:</strong> ${product.rating.rate}</p>
              </div>
            </div>
          `;
          productDetailsContainer.innerHTML = productHTML;
    
      });
  }

  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');
  

  fetchProductDetails(productId);
 