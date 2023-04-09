// TRANSFORMA LINHAS DA TABELA EM OBJETOS DA CLASSE EQUIPE
class Equipe {
    constructor(posicao, logotipo, nome, turma, pontos, nota) {
        this.posicao = posicao;
        this.logotipo = logotipo;
        this.nome = nome;
        this.turma = turma;
        this.pontos = pontos;
        this.nota = nota
    }
}

var tableRows = document.querySelectorAll('tr:nth-child(n+2):nth-child(-n+33)');// nunca mais usar thead 
var initialEquipes = []; // variável que se manterá inalterável quanto aos elementos mudando somente a ordem deles
var arrayDeEquipes = []; //variável que sofrerá alterações conforme manipulações do usuário

document.addEventListener('load', init());

function init(){
    tableRows.forEach((element) => {
        let equipe = new Equipe();
        for (let i = 0; i < 6; i++) {
            switch (i) {
                case 0:
                    equipe.posicao = Number(element.querySelector(`td:nth-child(${i + 1})`).innerText);//antes de colocar number estava considerando como texto, por isso, na ordenação considerava a tabela UNICODE
                    break;
                case 1:
                    equipe.logotipo = element.querySelector(`td:nth-child(${i + 1})`).innerHTML;
                    break;
                case 2:
                    equipe.nome = element.querySelector(`td:nth-child(${i + 1})`).innerText;
                    break;
                case 3:
                    equipe.turma = element.querySelector(`td:nth-child(${i + 1})`).innerText;
                    break;
                case 4:
                    equipe.pontos = element.querySelector(`td:nth-child(${i + 1})`).innerText;
                    break;
                case 5:
                    equipe.nota = element.querySelector(`td:nth-child(${i + 1})`).innerText;
                    break;
            }
        }
        arrayDeEquipes.push(equipe);
    })

    initialEquipes = arrayDeEquipes;
}

// A S C E N D I N G

const sortUpIcons = document.querySelectorAll('i.fa-sort-up');

sortUpIcons.forEach((element) => element.addEventListener('click', ascendingOrder))

function ascendingOrder() {
    removeTableRows();
    if (filter.value == "all") {
        ascendingSort(initialEquipes);
        initialEquipes.forEach((element) => createTableRow(element));
    } else {
        ascendingSort(arrayDeEquipes);
        arrayDeEquipes.forEach((element) => createTableRow(element));
    }
}

// D E S C E N D I N G

const sortDownIcons = document.querySelectorAll('i.fa-sort-down');

sortDownIcons.forEach((element) => element.addEventListener('click', descendingOrder));

function descendingOrder() {
    removeTableRows()
    if (filter.value == "all") {
        descendingSort(initialEquipes);
        initialEquipes.forEach((element) => createTableRow(element));
    } else {
        descendingSort(arrayDeEquipes);
        arrayDeEquipes.forEach((element) => createTableRow(element));
    }
}

// ALPHABETICAL ORDER (quando ordena após mexer em filtros, mesmo colocando em todos, ele está considerando o array de equipes que foi modificado)

const a_Z = document.querySelector('i.fa-arrow-down-a-z').addEventListener('click', ordenaDeA_Z);

function ordenaDeA_Z() {
    removeTableRows()
    if (filter.value == "all") {
        sortA_Z(initialEquipes);
        initialEquipes.forEach((element) => createTableRow(element));
    } else {
        sortA_Z(arrayDeEquipes);
        arrayDeEquipes.forEach((element) => createTableRow(element));
    }
}

const z_A = document.querySelector('i.fa-arrow-up-a-z').addEventListener('click', ordernaDeZ_A);

function ordernaDeZ_A() {
    removeTableRows()
    if (filter.value == "all") {
        sortZ_A(initialEquipes);
        initialEquipes.forEach((element) => createTableRow(element));
    } else {
        sortZ_A(arrayDeEquipes);
        arrayDeEquipes.forEach((element) => createTableRow(element));
    }
}

// FILTERING BY CLASSROOM

const filter = document.querySelector('[name="filter"]');
filter.addEventListener('change', filterByClassroom)

function filterByClassroom() {
    removeTableRows();
    if (filter.value == "all") {
        initialEquipes.forEach((element) => createTableRow(element));
    } else {
        arrayDeEquipes = initialEquipes.filter((element) => element.turma == filter.value);
        arrayDeEquipes.forEach((element) => createTableRow(element));
    }
}

// FUNÇÕES AUXILIARES

function removeTableRows() {
    let trs = document.querySelectorAll('tr:nth-child(n+2):nth-child(-n+33)');
    trs.forEach((element) => element.remove());
}

function createTableRow(equipe) {
    let tr = document.createElement('tr');
    for (let property in equipe) {
        tr.insertAdjacentHTML('beforeend', `<td>${equipe[property]}</td>`);
    }
    document.querySelector('table').appendChild(tr);
}

function ascendingSort(array) {
    return array.sort((a, b) => {
        if (a.posicao > b.posicao) return 1;
        if (a.posicao < b.posicao) return -1;
        return 0;
    });
}

function descendingSort(array) {
    return array.sort((a, b) => {
        if (a.posicao < b.posicao) return 1;
        if (a.posicao > b.posicao) return -1;
        return 0;
    });
}

function sortA_Z(array) {
    return array.sort((a, b) => {
        if (a.nome > b.nome) return 1;
        if (a.nome < b.nome) return -1;
        return 0;
    });
}

function sortZ_A(array) {
    return array.sort((a, b) => {
        if (a.nome < b.nome) return 1;
        if (a.nome > b.nome) return -1;
        return 0;
    });
}