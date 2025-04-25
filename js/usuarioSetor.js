function screenSelectSector() {
    const sectors = ['Produção', 'Manutenção', 'Expedição'];
    const buttonsHtml = sectors
      .map(s => `<button class="btn btn-primary usuario__botao__setor" onclick="selectSector('${s}')">${s}</button>`)
      .join('');
    showScreen(`
      <h2 class="usuario__titulo">Qual o seu setor?</h2>
      <div>${buttonsHtml}</div>
    `);
  }
  
  function selectSector(sector) {
    tempData.setor = sector;
    screenSatisfaction();
  }