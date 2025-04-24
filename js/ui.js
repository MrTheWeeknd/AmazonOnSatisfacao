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
  
  // 1. Seleção de setor
  function screenSelectSector() {
    const sectors = ['Produção', 'Manutenção', 'Expedição'];
    const buttonsHtml = sectors
      .map(s => `<button class="btn btn-primary m-2" onclick="selectSector('${s}')">${s}</button>`)
      .join('');
    showScreen(`
      <h2 class="titulo">Selecione o Setor</h2>
      <div>${buttonsHtml}</div>
    `);
  }
  
  function selectSector(sector) {
    tempData.setor = sector;
    screenSatisfaction();
  }
  
  // 2. Nível de satisfação
  function screenSatisfaction() {
    const levels = ['Muito Satisfeito','Satisfeito','Neutro','Insatisfeito','Muito Insatisfeito'];
    let radios = levels.map((l,i) => `
      <div class="form-check">
        <input class="form-check-input" type="radio" name="satisfaction" value="${l}" id="sat${i}">
        <label class="form-check-label" for="sat${i}">${l}</label>
      </div>`).join('');
    showScreen(`
      <h2 class= "titulo">Nível de Satisfação</h2>
      <form id="form-sat">${radios}</form>
      <button class="btn btn-primary" onclick="goToComments()">Próximo</button>
    `);
  }
  
  function goToComments() {
    const sel = document.querySelector('input[name="satisfaction"]:checked');
    if (!sel) return alert('Selecione um nível de satisfação');
    tempData.nivel = sel.value;
    screenComments();
  }
  
  // 3. Observações
  function screenComments() {
    showScreen(`
      <h2 class= "titulo">Observações</h2>
      <textarea id="obs" class="form-control mb-3" rows="3" placeholder="Digite um breve comentário de agradecimento ou sugestões."></textarea>
      <button class="btn btn-primary" onclick="finishSurvey()">Enviar</button>
    `);
  }
  
  function finishSurvey() {
    tempData.observacao = document.getElementById('obs').value;
    tempData.data = new Date().toISOString();
    // inicia fluxo de cardápio
    screenCategoryProteina();
  }
  
  // 4. Categorias de cardápio
  defaultMenu = {
    proteina: [
      {id:1,name:'Frango Grelhado',img:'img/frangoassado.jpg'},
      {id:2,name:'Peixe Assado',img:'img/peixeassado.jpg'}
    ],
    carboidrato: [
      {id:3,name:'Arroz Integral',img:'img/arroz.jpg'},
      {id:4,name:'Batata Cozida',img:'img/batatacozida.jpg'}
    ],
    salada: [
      {id:5,name:'Salada Verde',img:'img/saladaverde.jpg'},
      {id:6,name:'Tomate',img:'img/tomate.jpg'}
    ],
    sobremesa: [
      {id:7,name:'Fruta',img:'img/fruta.jpg'},
      {id:8,name:'Pudim',img:'img/pudim.jpg'}
    ]
  };
  
  function screenCategoryProteina() {
    const cards = defaultMenu.proteina.map(item => `
      <div class="col-6 mb-3">
        <div class="card">
          <img src="${item.img}" class="card-img-top" />
          <div class="card-body">
            <h5>${item.name}</h5>
            <button class="btn btn-primary" onclick="selectCategory('proteina', '${item.name}', screenCategoryCarboidrato)">Escolher</button>
          </div>
        </div>
      </div>`).join('');
    showScreen(`
      <h2 class= "titulo">Escolha sua Proteína</h2>
      <div class="row">${cards}</div>
    `);
  }
  
  function screenCategoryCarboidrato() {
    const cards = defaultMenu.carboidrato.map(item => `
      <div class="col-6 mb-3">
        <div class="card">
          <img src="${item.img}" class="card-img-top" />
          <div class="card-body">
            <h5>${item.name}</h5>
            <button class="btn btn-primary" onclick="selectCategory('carboidrato', '${item.name}', screenCategorySalada)">Escolher</button>
          </div>
        </div>
      </div>`).join('');
    showScreen(`
      <h2 class= "titulo">Escolha seu Carboidrato</h2>
      <div class="row">${cards}</div>
    `);
  }
  
  function screenCategorySalada() {
    const cards = defaultMenu.salada.map(item => `
      <div class="col-6 mb-3">
        <div class="card">
          <img src="${item.img}" class="card-img-top" />
          <div class="card-body">
            <h5>${item.name}</h5>
            <button class="btn btn-primary" onclick="selectCategory('salada', '${item.name}', screenCategorySobremesa)">Escolher</button>
          </div>
        </div>
      </div>`).join('');
    showScreen(`
      <h2 class= "titulo">Escolha sua Salada</h2>
      <div class="row">${cards}</div>
    `);
  }
  
  function screenCategorySobremesa() {
    const cards = defaultMenu.sobremesa.map(item => `
      <div class="col-6 mb-3">
        <div class="card">
          <img src="${item.img}" class="card-img-top" />
          <div class="card-body">
            <h5>${item.name}</h5>
            <button class="btn btn-primary" onclick="selectCategory('sobremesa', '${item.name}', screenMenuSummary)">Escolher</button>
          </div>
        </div>
      </div>`).join('');
    showScreen(`
      <h2 class= "titulo">Escolha sua Sobremesa</h2>
      <div class="row">${cards}</div>
    `);
  }
  
  function selectCategory(category, name, nextScreen) {
    tempData.escolhaCardapio[category] = name;
    nextScreen();
  }
  
  // 5. Tela de resumo e confirmação
  function screenMenuSummary() {
    const { proteina, carboidrato, salada, sobremesa } = tempData.escolhaCardapio;
    showScreen(`
      <h2 class= "titulo">Resumo do Pedido</h2>
      <ul>
        <li>Proteína: ${proteina} <button class="btn btn-link" onclick="screenCategoryProteina()">Editar</button></li>
        <li>Carboidrato: ${carboidrato} <button class="btn btn-link" onclick="screenCategoryCarboidrato()">Editar</button></li>
        <li>Salada: ${salada} <button class="btn btn-link" onclick="screenCategorySalada()">Editar</button></li>
        <li>Sobremesa: ${sobremesa} <button class="btn btn-link" onclick="screenCategorySobremesa()">Editar</button></li>
      </ul>
      <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#confirmOrderModal">Confirmar Pedido</button>
  
      <!-- Modal de confirmação -->
      <div class="modal fade" id="confirmOrderModal" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header"><h5 class="modal-title">Confirmar Pedido</h5></div>
            <div class="modal-body">
              <p>Tem certeza que deseja enviar este pedido?</p>
            </div>
            <div class="modal-footer">
              <button class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
              <button class="btn btn-primary" data-bs-dismiss="modal" onclick="submitFinalOrder()">Sim, enviar</button>
            </div>
          </div>
        </div>
      </div>
    `);
  }
  
function screenThankYouChoice() {
    showScreen(`
      <h2 class= "titulo">Obrigado por participar!</h2>
      <p class= "subtitulo">Deseja escolher a refeição de amanhã?</p>
      <button class="btn btn-primary mt-3" onclick="finalizeWithoutMeal()">
        Não, obrigado!
      </button>
      <button class="btn btn-primary mt-3" data-bs-toggle="modal" data-bs-target="#nextMealModal">
        Sim, quero escolher!
      </button>
      <div class="modal fade" id="nextMealModal" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header"><h5 class="modal-title">Seleção de Cardápio</h5></div>
            <div class="modal-body">
              <p>Deseja escolher a refeição de amanhã?</p>
            </div>
            <div class="modal-footer">
              <button class="btn btn-secondary" data-bs-dismiss="modal" onclick="finalizeWithoutMeal()">Não</button>
              <button class="btn btn-primary" data-bs-dismiss="modal" onclick="screenCategoryProteina()">Sim</button>
            </div>
          </div>
        </div>
      </div>
    `);
  }
  
  // Finaliza sem escolher refeição e retorna à tela inicial após 5s
  function finalizeWithoutMeal() {
    showScreen(`
      <h2 class= "titulo">Pesquisa finalizada!</h2>
      <p class= "subtitulo">Obrigado pela participação.</p>
    `);
    setTimeout(() => screenSelectSector(), 5000);
  }
  
  // Substitua o finishSurvey original por esta versão:
  function finishSurvey() {
    tempData.observacao = document.getElementById('obs').value;
    tempData.data = new Date().toISOString();
    // pergunta se deseja escolher refeição de amanhã
    screenThankYouChoice();
  }
  
  // Função de envio final, grava e retorna à tela inicial após 5s
  function submitFinalOrder() {
    Storage.saveResponse({ ...tempData });
    showScreen(`
      <h2 class= "titulo">Pedido enviado!</h2>
      <p class= "subtitulo">Obrigado pela participação.</p>
    `);
    setTimeout(() => screenSelectSector(), 5000);
  }
  