// Inicialização das variáveis de controle
let totalReceitas = 0;
let totalDespesas = 0;

const form = document.getElementById('formTransacoes');

const corpoTabela = document.getElementById('tabelaTransacoesResultado');

const displaySaldo = document.getElementById('display-saldo');
const displayReceitas = document.getElementById('display-receitas');
const displayDespesas = document.getElementById('display-despesas');

// Função principal de cálculo
function atualizarDashboard() {
    const saldo = totalReceitas - totalDespesas;

    // (Cálculo)
    displaySaldo.textContent = `R$ ${saldo.toFixed(2).replace('.', ',')}`;
    displayReceitas.textContent = `R$ ${totalReceitas.toFixed(2).replace('.', ',')}`;
    displayDespesas.textContent = `R$ ${totalDespesas.toFixed(2).replace('.', ',')}`;
}

form.addEventListener('submit', function (event) {
    // Impedir o recarregamento da página (comportamento padrão do formulário)
    event.preventDefault();

    // 1. Coletar os dados do formulário
    const tipo = document.getElementById('tipo').value;
    const descricao = document.getElementById('descricao').value;
    let valor = parseFloat(document.getElementById('valor').value);

    // (validação e cálculo)
    if (tipo === 'despesa') {
        totalDespesas += valor;
        // Simulação: valor negativo para despesa no cálculo interno
        valor = -valor;
    } else if (tipo === 'receita') {
        totalReceitas += valor;
    } else {
        alert('Por favor, selecione um tipo válido (Receita ou Despesa).');
        return; // Impede a continuação do código se o tipo for inválido
    }

    // 2. Criar a nova linha e células 
    const novaLinha = document.createElement('tr');

    // Classe para estilização de cores (verde/vermelho)
    const classeTipo = tipo === 'receita' ? 'tipo-receita' : 'tipo-despesa';

    // Coluna Tipo
    let tdTipo = document.createElement('td');
    tdTipo.textContent = tipo.charAt(0).toUpperCase() + tipo.slice(1);
    tdTipo.classList.add(classeTipo);
    tdTipo.setAttribute('data-label', 'Tipo');

    // Coluna Descrição
    let tdDescricao = document.createElement('td');
    tdDescricao.textContent = descricao;
    tdDescricao.setAttribute('data-label', 'Descrição');

    // Coluna Valor (Exibir como positivo, o cálculo já foi feito)
    let tdValor = document.createElement('td');
    tdValor.textContent = `R$ ${Math.abs(valor).toFixed(2).replace('.', ',')}`;
    tdValor.classList.add(classeTipo);
    tdValor.setAttribute('data-label', 'Valor (R$)');


    // Anexar à Linha
    novaLinha.appendChild(tdTipo);
    novaLinha.appendChild(tdDescricao);
    novaLinha.appendChild(tdValor);

    // Anexar ao Corpo da Tabela
    corpoTabela.appendChild(novaLinha);

    // Atualizar o Dashboard de Resumo
    atualizarDashboard();

    // Limpar o Formulário
    form.reset();
});

// Inicializa o dashboard ao carregar a página
atualizarDashboard();