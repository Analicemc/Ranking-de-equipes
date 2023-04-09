// TRANSFORMA LINHAS DA TABELA EM OBJETOS DA CLASSE EQUIPE
class Equipe{
    constructor(posicao, logotipo, nome, turma, pontos, nota){
        this.posicao = posicao;
        this.logotipo = logotipo;
        this.nome = nome;
        this.turma = turma;
        this.pontos = pontos;
        this.nota = nota
    }
}

var tableRows = document.querySelectorAll('tr:nth-child(n+2):nth-child(-n+33)');// nunca mais usar thead 
var arrayDeEquipes = [];

    tableRows.forEach((element) =>{
        let equipe = new Equipe();
        for (let i = 0; i < 6; i++){
            switch (i){
                case 0:
                    equipe.posicao = element.querySelector(`td:nth-child(${i+1})`).innerText;
                    break;
                case 1:
                    equipe.logotipo = element.querySelector(`td:nth-child(${i+1})`).innerHTML;
                    break;
                case 2:
                    equipe.nome = element.querySelector(`td:nth-child(${i+1})`).innerText;
                    break;
                case 3:
                    equipe.turma = element.querySelector(`td:nth-child(${i+1})`).innerText;
                    break;
                case 4:
                    equipe.pontos = element.querySelector(`td:nth-child(${i+1})`).innerText;
                    break;
                case 5:
                    equipe.nota = element.querySelector(`td:nth-child(${i+1})`).innerText;
                    break;
            } 
        }
        arrayDeEquipes.push(equipe);
    })
    var initialEquipes = arrayDeEquipes;

// A S C E N D I N G
const sortUpIcons = document.querySelectorAll('i.fa-sort-up');

sortUpIcons.forEach((element) => element.addEventListener('click', ascendingOrder))

function ascendingOrder(){
    removeTableRows();
    arrayDeEquipes.sort((a, b) => {
        if(a.posicao > b.posicao) return 1;
        if(a.posicao < b.posicao) return -1;
        return 0;
    });
    arrayDeEquipes.forEach((element) => createTableRow(element));
}

// D E S C E N D I N G

const sortDownIcons = document.querySelectorAll('i.fa-sort-down');

sortDownIcons.forEach((element) => element.addEventListener('click', descendingOrder));

function descendingOrder(){
    removeTableRows()
    arrayDeEquipes.sort((a, b) => {
        if(a.posicao < b.posicao) return 1;
        if(a.posicao > b.posicao) return -1;
        return 0;
    });
    arrayDeEquipes.forEach((element) => createTableRow(element));
}

// ALPHABETICAL ORDER (quando ordena após mexer em filtros, mesmo colocando em todos, ele está considerando o array de equipes que foi modificado)

const a_Z = document.querySelector('i.fa-arrow-down-a-z').addEventListener('click', ordenaDeA_Z);

function ordenaDeA_Z(){
    removeTableRows()
    arrayDeEquipes.sort((a, b) => {
        if(a.nome > b.nome) return 1;
        if(a.nome < b.nome) return -1;
        return 0;
    });
    arrayDeEquipes.forEach((element) => createTableRow(element));
}

const z_A = document.querySelector('i.fa-arrow-up-a-z').addEventListener('click', ordernaDeZ_A);

function ordernaDeZ_A(){
    removeTableRows()
    arrayDeEquipes.sort((a, b) => {
        if(a.nome < b.nome) return 1;
        if(a.nome > b.nome) return -1;
        return 0;
    });
    arrayDeEquipes.forEach((element) => createTableRow(element));
}

// FILTERING BY CLASSROOM

const filter = document.querySelector('[name="filter"]');
filter.addEventListener('change', filterByClassroom)

function filterByClassroom(){
    removeTableRows();
    if (filter.value == "all") initialEquipes.forEach((element) => createTableRow(element)); //quando colocar todas, fazer ficar todas do documento original
    arrayDeEquipes = initialEquipes.filter((element) => element.turma == filter.value);
    arrayDeEquipes.forEach((element) => createTableRow(element));
}

// FUNÇÕES AUXILIARES

function removeTableRows(){
    let trs = document.querySelectorAll('tr:nth-child(n+2):nth-child(-n+33)');
    trs.forEach((element) => element.remove());
}

function createTableRow(equipe){
    let tr = document.createElement('tr');
    for (let property in equipe) {
        tr.insertAdjacentHTML('beforeend', `<td>${equipe[property]}</td>`);
    }
    document.querySelector('table').appendChild(tr);
}
