// Enviar os dados do formulário para o servidor
const cadastro = document.getElementById('cadastro');
cadastro.addEventListener('submit', (event) => {
    event.preventDefault();
    const corpo = {
        nome: cadastro.nome.value,
        cpf: cadastro.cpf.value,
        nascimento: cadastro.nascimento.value
    }
    fetch('http://localhost:4000/clientes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(corpo)
    })
        .then(response => response.status)
        .then(status => {
            if (status === 201) {
                msg3('Cliente cadastrado com sucesso');
            } else {
                alert('Erro ao cadastrar cliente');
            }
        });
});

// Receber os dados do servidor e exibir na tabela
fetch('http://localhost:4000/clientes')
    .then(response => response.json())
    .then(clientes => {
        const tabela = document.getElementById('clientes');
        clientes.forEach(cliente => {
            // Formatar a data para o padrão brasileiro (DD/MM/AAAA)
            const dataBruta = cliente.nascimento;
            const dataFormatada = new Date(dataBruta).toLocaleDateString('pt-BR');

            const linha = document.createElement('tr');
            linha.innerHTML = `
                <td>${cliente.id_cliente}</td>
                <td>${cliente.nome}</td>
                <td>${cliente.cpf}</td>
                <td>${dataFormatada}</td>
                <td><button onclick="excluirCliente(${cliente.id_cliente})">Excluir</button></td>
            `;
            tabela.appendChild(linha);
        });
    });

// Função para excluir cliente

// Função para exibir mensagem e atualizar a tabela sem recarregar a página
function msg3(mensagem) {
    const msg = document.getElementById('msg');
    msg.innerHTML = mensagem;
    setTimeout(() => {
        msg.innerHTML = '';
        window.location.reload(); // Atualiza a tabela após 3 segundos
    }, 3000);
}
