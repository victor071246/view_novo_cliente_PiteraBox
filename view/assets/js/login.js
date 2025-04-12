let logged = false;

function login(event) {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const statusDiv = document.getElementById('status');

    // Validação básica
    if (!username || !password) {
        statusDiv.textContent = '⚠️ Preencha todos os campos.';
        statusDiv.style.color = 'orange';
        return;
    }

    // Autenticação simples
    if (username === 'admin' && password === 'admin') {
        logged = true;
        statusDiv.textContent = '✅ Login bem-sucedido!';
        statusDiv.style.color = 'green';
        console.log('Usuário logado:', logged);

        setTimeout(() => {
            window.location.href = 'add_product.html';
        }, 1500);
    } else {
        logged = false;
        statusDiv.textContent = '❌ Usuário ou senha inválidos.';
        statusDiv.style.color = 'red';
    }
}
