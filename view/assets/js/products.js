const productsDiv = document.getElementById('products');

const api = fetch('http://localhost:3333/products')
    .then((res) => res.json())
    .then((products) =>
        products.forEach((product) => {
            productsDiv.innerHTML += `
            <div class="product-card" id="${product._id}">
                <img
                    class="product-img"
                    src="${product.image_url}"
                    alt="Imagem do produto"
                />
                <div class="product-content">
                    <h3>${product.title}</h3>
                    <h4>${product.subtitle}</h4>
                    <p>${product.text}</p>
                </div>
            </div>
                    
    `;
        })
    );
