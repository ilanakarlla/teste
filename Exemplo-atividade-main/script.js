let funcionarios = [];
let pedidos = [];

function atualizarListaFuncionarios() {
    const lista = document.getElementById('lista-funcionarios');
    lista.innerHTML = '';
    funcionarios.forEach(func => {
        const li = document.createElement('li');
        li.textContent = `${func.nome} - ${func.cpf}`;
        lista.appendChild(li);
    });
    atualizarSelectResponsavel();
}

function atualizarSelectResponsavel() {
    const select = document.getElementById('responsavel-pedido');
    select.innerHTML = '';
    funcionarios.forEach(func => {
        const option = document.createElement('option');
        option.value = func.nome;
        option.textContent = func.nome;
        select.appendChild(option);
    });
}

document.getElementById('form-funcionario').addEventListener('submit', function(e) {
    e.preventDefault();
    const nome = document.getElementById('nome-funcionario').value;
    const cpf = document.getElementById('cpf-funcionario').value;

    if (nome && cpf.length === 11) {
        const funcionario = { nome, cpf };
        funcionarios.push(funcionario);
        localStorage.setItem('funcionarios', JSON.stringify(funcionarios));
        atualizarListaFuncionarios();
        document.getElementById('form-funcionario').reset();
    } else {
        alert('Por favor, preencha todos os campos corretamente.');
    }
});

document.getElementById('form-pedido').addEventListener('submit', function(e) {
    e.preventDefault();
    const nomePedido = document.getElementById('nome-pedido').value;
    const descricaoPedido = document.getElementById('descricao-pedido').value;
    const responsavel = document.getElementById('responsavel-pedido').value;
    const status = document.getElementById('status-pedido').value;

    const pedido = { nomePedido, descricaoPedido, responsavel, status };
    pedidos.push(pedido);
    localStorage.setItem('pedidos', JSON.stringify(pedidos));
    atualizarListaPedidos();
    document.getElementById('form-pedido').reset();
});

function atualizarListaPedidos() {
    const lista = document.getElementById('lista-pedidos');
    lista.innerHTML = '';
    pedidos.forEach(pedido => {
        const li = document.createElement('li');
        li.textContent = `${pedido.nomePedido} - Responsável: ${pedido.responsavel} - Status: ${pedido.status}`;
        lista.appendChild(li);
    });
}

// Carregar dados do localStorage ao iniciar
window.onload = function() {
    const funcionariosStorage = localStorage.getItem('funcionarios');
    const pedidosStorage = localStorage.getItem('pedidos');
    if (funcionariosStorage) {
        funcionarios = JSON.parse(funcionariosStorage);
        atualizarListaFuncionarios();
    }
    if (pedidosStorage) {
        pedidos = JSON.parse(pedidosStorage);
        atualizarListaPedidos();
    }
};
