const productsDiv = document.getElementById('products');

const api = fetch('http://localhost:3333/products')
    .then((res) => res.json())
    .then((products) =>
        products.forEach((product) => {
            productsDiv.innerHTML += `
            <div class="product-card" id="${product._id}">
                <button
                    class="delete-btn"
                    onclick="deleteProduct('${product._id}')"
                >
                    ×
                </button>
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
document.querySelector('#products').addEventListener('click', (event) => {
    if (event.target.classList.contains('submit-button')) {
        // Verifica se o elemento clicado é um botão com a classe "botao"
        const index = Array.from(document.querySelectorAll('.botao')).indexOf(
            event.target
        );
        console.log(`Botão ${index + 1} clicado`);
        const title = document.getElementById('input-title').value.trim();
        const subtitle = document.getElementById('input-subtitle').value.trim();
        const image_url = document.getElementById('input-img-url').value.trim();
        const text = document.getElementById('textarea-text').value.trim();
        const color1 = document.getElementById('color-1').value.trim();
        const color2 = document.getElementById('color-2').value.trim();

        if (!title || !image_url || !text) {
            alert('Preencha todos os campos.');
            return;
        }

        const newProduct = { title, subtitle, image_url, text, color1, color2 };

        fetch('http://localhost:3333/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProduct),
        })
            .then((res) => res.json())
            .then((product) => {
                // Adiciona o produto ao DOM sem recarregar
                productsDiv.innerHTML += `
            <div class="product-card" id="${product._id}">
                <button
                    class="delete-btn"
                    onclick="deleteProduct('${product._id}')"
                >
                    ×
                </button>
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

                // Limpa os campos
                document.getElementById('input-title').value = '';
                document.getElementById('input-img-url').value = '';
                document.getElementById('textarea-text').value = '';
                document.getElementById('input-subtitle').value = '';
                document.getElementById('color-1').value = '';
                document.getElementById('color-2').value = '';
            })
            .catch((err) => {
                console.error('Erro ao adicionar produto:', err);
                alert('Erro ao adicionar produto.');
            });
    }
});
// document.querySelector('.submit-button').addEventListener('click', (event) => {
//     event.preventDefault();
//     console.log('botão clicado');
//     const title = document.getElementById('input-title').value.trim();
//     const subtitle = document.getElementById('input-subtitle').value.trim();
//     const image_url = document.getElementById('input-img-url').value.trim();
//     const text = document.getElementById('textarea-text').value.trim();
//     const color1 = document.getElementById('color-1').value.trim();
//     const color2 = document.getElementById('color-2').value.trim();

//     if (!title || !image_url || !text) {
//         alert('Preencha todos os campos.');
//         return;
//     }

//     const newProduct = { title, subtitle, image_url, text, color1, color2 };

//     fetch('http://localhost:3333/products', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(newProduct),
//     })
//         .then((res) => res.json())
//         .then((product) => {
//             // Adiciona o produto ao DOM sem recarregar
//             productsDiv.innerHTML += `
//             <div class="product-card" id="${product._id}">
//                 <button
//                     class="delete-btn"
//                     onclick="deleteProduct('${product._id}')"
//                 >
//                     ×
//                 </button>
//                 <img
//                     class="product-img"
//                     src="${product.image_url}"
//                     alt="Imagem do produto"
//                 />
//                 <div class="product-content">
//                     <h3>${product.title}</h3>
//                     <h4>${product.subtitle}</h4>
//                     <p>${product.text}</p>
//                 </div>
//             </div>

//     `;

//             // Limpa os campos
//             document.getElementById('input-title').value = '';
//             document.getElementById('input-img-url').value = '';
//             document.getElementById('textarea-text').value = '';
//             document.getElementById('input-subtitle').value = '';
//             document.getElementById('color-1').value = '';
//             document.getElementById('color-2').value = '';
//         })
//         .catch((err) => {
//             console.error('Erro ao adicionar produto:', err);
//             alert('Erro ao adicionar produto.');
//         });
// });

function deleteProduct(productId) {
    fetch(`http://localhost:3333/products/${productId}`, {
        method: 'DELETE',
    })
        .then((res) => {
            if (res.ok) {
                // Remove o card do DOM
                const card = document.getElementById(productId);
                if (card) {
                    card.remove();
                }
            } else {
                console.error('Erro ao deletar o produto');
            }
        })
        .catch((err) => {
            console.error('Erro na requisição DELETE:', err);
        });
}
