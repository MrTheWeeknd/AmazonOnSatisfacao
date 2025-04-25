function screenMenuSummary() {
    const { proteina, carboidrato, salada, sobremesa } = tempData.escolhaCardapio;
    showScreen(`
      <h2 class= "usuario__titulo">Resumo do Pedido</h2>
      <ul class="usuario__pedido__subtitulo">
        <li class="usuario__pedido__lista" >Proteína: ${proteina} <button class="btn btn-link" onclick="screenCategoryProteina()"> <img src="img/editar.svg" alt="botão de editar" srcset="" class="usuario__img__editar"> </button></li>
        <li class="usuario__pedido__lista">Carboidrato: ${carboidrato} <button class="btn btn-link" onclick="screenCategoryCarboidrato()"> <img src="img/editar.svg" alt="botão de editar" srcset="" class="usuario__img__editar"></button></li>
        <li class="usuario__pedido__lista">Salada: ${salada} <button class="btn btn-link" onclick="screenCategorySalada()"> <img src="img/editar.svg" alt="botão de editar" srcset="" class="usuario__img__editar"> </button></li>
        <li class="usuario__pedido__lista">Sobremesa: ${sobremesa} <button class="btn btn-link" onclick="screenCategorySobremesa()"> <img src="img/editar.svg" alt="botão de editar" srcset="" class="usuario__img__editar"> </button></li>
      </ul>
      <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#confirmOrderModal">Confirmar Pedido</button>
  
      <!-- Modal de confirmação -->
      <div class="modal fade" id="confirmOrderModal" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header "><h5 class="modal-title usuario__titulo__modal">Confirmar Pedido</h5></div>
            <div class="modal-body">
              <p class="usuario__pedido__subtitulo__modal" >Tem certeza que deseja enviar este pedido?</p>
            </div>
            <div class="modal-footer">
              <button class="btn usuario__botao__navegacao botao__voltar" data-bs-dismiss="modal">Cancelar</button>
              <button class="btn btn-primary usuario__botao__navegacao" data-bs-dismiss="modal" onclick="submitFinalOrder()">Sim, enviar</button>
            </div>
          </div>
        </div>
      </div>
    `);
  }
  
function screenThankYouChoice() {
    showScreen(`
      <h2 class= "usuario__titulo">Obrigado por participar!</h2>
      <p class= "usuario__pedido__subtitulo">Deseja escolher a refeição de amanhã?</p>
      <button class="btn botao__voltar botao__usuario__escolhaOpcaoRefeicao" onclick="finalizeWithoutMeal()">
        Não, obrigado!
      </button>
      <button class="btn btn-primary botao__usuario__escolhaOpcaoRefeicao"  data-bs-toggle="modal" data-bs-target="#nextMealModal" onclick="screenCategoryProteina()">
        Sim, quero escolher!
      </button>
    `);
  }
  
  // Finaliza sem escolher refeição e retorna à tela inicial após 2s
  function finalizeWithoutMeal() {
    Storage.saveResponse({ ...tempData });
    showScreen(`
      <h2 class= "usuario__titulo">Pesquisa finalizada!</h2>
      <p class= "usuario__pedido__subtitulo">Obrigado pela participação.</p>
    `);
    setTimeout(() => screenSelectSector(), 2000);
  }
  
  // Substitua o finishSurvey original por esta versão:
  function finishSurvey() {
    tempData.observacao = document.getElementById('obs').value;
    tempData.data = new Date().toISOString();
    // pergunta se deseja escolher refeição de amanhã
    screenThankYouChoice();
  }
  
  // Função de envio final, grava e retorna à tela inicial após 2s
  function submitFinalOrder() {
    Storage.saveResponse({ ...tempData });
    showScreen(`
      <h2 class= "usuario__titulo">Pedido enviado!</h2>
      <p class= "usuario__pedido__subtitulo">Obrigado pela participação.</p>
    `);
    setTimeout(() => screenSelectSector(), 2000);
  }