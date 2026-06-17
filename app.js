var tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
var campo = document.getElementById('campoTarefa');
var lista = document.getElementById('listaTarefas');

function guardar() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function mostrar() {
    lista.innerHTML = '';
    tarefas.forEach(function(t) {
        var div = document.createElement('div');
        div.className = 'tarefa' + (t.feita ? ' feita' : '');
        div.innerHTML = '<span class="checkbox">' + (t.feita ? '☑' : '☐') + '</span>' +
                        '<span class="texto">' + t.texto + '</span>' +
                        '<span class="apagar">×</span>';
        div.querySelector('.checkbox').onclick = function() { t.feita = !t.feita; guardar(); mostrar(); };
        div.querySelector('.texto').onclick = function() { t.feita = !t.feita; guardar(); mostrar(); };
        div.querySelector('.apagar').onclick = function() { tarefas = tarefas.filter(function(x) { return x.id !== t.id; }); guardar(); mostrar(); };
        lista.appendChild(div);
    });
}

function adicionar() {
    var texto = campo.value.trim();
    if (texto === '') return;
    tarefas.push({ id: Date.now(), texto: texto, feita: false });
    guardar(); mostrar();
    campo.value = '';
}

document.getElementById('botaoAdicionar').onclick = adicionar;
campo.onkeypress = function(e) { if (e.key === 'Enter') adicionar(); };
mostrar();
