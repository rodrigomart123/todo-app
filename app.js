var tarefas = [];
var campoTarefa = document.getElementById('campoTarefa');
var botaoAdicionar = document.getElementById('botaoAdicionar');
var listaTarefas = document.getElementById('listaTarefas');

function carregarTarefas() {
    var guardado = localStorage.getItem('tarefas');
    if (guardado) {
        tarefas = JSON.parse(guardado);
    }
}

function guardarTarefas() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function adicionarTarefa() {
    var texto = campoTarefa.value.trim();
    if (texto === '') return;

    tarefas.push({
        id: Date.now(),
        texto: texto,
        feita: false
    });
    guardarTarefas();
    mostrarTarefas();
    campoTarefa.value = '';
}

function apagarTarefa(id) {
    tarefas = tarefas.filter(function(t) { return t.id !== id; });
    guardarTarefas();
    mostrarTarefas();
}

function toggleTarefa(id) {
    for (var i = 0; i < tarefas.length; i++) {
        if (tarefas[i].id === id) {
            tarefas[i].feita = !tarefas[i].feita;
            break;
        }
    }
    guardarTarefas();
    mostrarTarefas();
}

function mostrarTarefas() {
    listaTarefas.innerHTML = '';
    for (var i = 0; i < tarefas.length; i++) {
        var tarefa = tarefas[i];

        var div = document.createElement('div');
        div.className = 'tarefa' + (tarefa.feita ? ' feita' : '');

        var checkbox = document.createElement('span');
        checkbox.className = 'checkbox';
        checkbox.textContent = tarefa.feita ? '☑' : '☐';

        var texto = document.createElement('span');
        texto.className = 'texto';
        texto.textContent = tarefa.texto;

        var apagar = document.createElement('span');
        apagar.className = 'apagar';
        apagar.textContent = '×';

        div.appendChild(checkbox);
        div.appendChild(texto);
        div.appendChild(apagar);
        listaTarefas.appendChild(div);

        (function(id) {
            checkbox.addEventListener('click', function() { toggleTarefa(id); });
            texto.addEventListener('click', function() { toggleTarefa(id); });
            apagar.addEventListener('click', function() { apagarTarefa(id); });
        })(tarefa.id);
    }
}

botaoAdicionar.addEventListener('click', adicionarTarefa);
campoTarefa.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') adicionarTarefa();
});

carregarTarefas();
mostrarTarefas();
