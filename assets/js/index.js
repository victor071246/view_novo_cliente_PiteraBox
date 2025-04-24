let index = 0;

async function carregarProdutos() {
    try {
        const res = await fetch('http://localhost:3333/products');
        const data = await res.json();
        const produtos = Array.isArray(data) ? data : [];
        console.log(produtos);
        return produtos;
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        return [];
    }
}

function mudarConteudo(produtos) {
    const produto = produtos[index];

    // Pega todas as folhas de estilo da página
    const styleSheet = [...document.styleSheets].find((sheet) => {
        try {
            return [...sheet.cssRules].some(
                (rule) => rule.selectorText === 'body::after'
            );
        } catch (e) {
            return false; // Evita erros de CORS se tiver folha externa
        }
    });

    if (styleSheet) {
        const regra = [...styleSheet.cssRules].find(
            (rule) => rule.selectorText === 'body::after'
        );

        if (regra) {
            regra.style.background = `linear-gradient(90deg, ${produto.color1}, ${produto.color2})`;
        }
    }

    // Atualiza o conteúdo do título e texto
    document.getElementById('title').textContent = produto.title;
    document.getElementById('subtitle').textContent = produto.subtitle;
    document.getElementById('text').textContent = produto.text;
    document.getElementById('image-src').src = produto.image_url;

    // Avança para o próximo item (ou volta ao primeiro)
    index = (index + 1) % produtos.length;
}

function iniciarTransicao(produtos) {
    const transicao = document.getElementById('transicao');

    // Mover a barra da esquerda até sair pela direita
    transicao.style.transition = 'none'; // Desabilita a transição momentaneamente
    transicao.style.left = '-100%'; // Move a barra para a esquerda (fora da tela)

    // Força reflow antes de animar
    void transicao.offsetWidth;

    // Ativa a transição de volta
    transicao.style.transition = 'left 2.5s ease';
    transicao.style.left = '100%'; // Move a barra para a direita (fora da tela)

    // Atualiza o conteúdo com os dados do próximo produto
    setTimeout(() => {
        mudarConteudo(produtos);
    }, 800);

    // Chama novamente a função de transição após 15 segundos
    setTimeout(() => {
        iniciarTransicao(produtos); // Chama a transição novamente com os produtos
    }, 15000); // Delay de 15000ms (15 segundos)
}

// Inicia a transição automaticamente após 15 segundos do carregamento da página
window.onload = async () => {
    const produtos = await carregarProdutos();

    if (produtos.length > 0) {
        setTimeout(() => {
            iniciarTransicao(produtos); // Inicia a transição passando os produtos corretamente
        }, 15000); // 15000ms (15 segundos)
    } else {
        console.warn('Nenhum produto carregado.');
    }
};
