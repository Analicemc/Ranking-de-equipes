document.getElementById('pesquisar').addEventListener('input', function () {
    var input = event.target.value;
    var table = document.getElementById('tabela_ranking');
    var rows = table.getElementsByTagName('tr');

    for (var i = 1; i < rows.length; i++) {

        var equipe = rows[i].getElementsByTagName('td')[2].innerText;
        if (equipe.toLowerCase().indexOf(input.toLowerCase()) > -1) {

            rows[i].style.display = '';
        }
        else {
            rows[i].style.display = 'none';
        }
    }
});