let tempData = {
    setor: '',
    nivel: '',
    observacao: '',
    escolhaCardapio: {
      proteina: '',
      carboidrato: '',
      salada: '',
      sobremesa: ''
    },
    data: ''
  };
  
  function showScreen(html) {
    document.getElementById('app').innerHTML = html;
  }
