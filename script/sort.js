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

// A S C E N D I N G
var sortUpIcons = document.querySelectorAll('i.fa-sort-up');

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

var sortDownIcons = document.querySelectorAll('i.fa-sort-down');

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
