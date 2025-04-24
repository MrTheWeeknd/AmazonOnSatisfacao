  function getStoredData() {
    return JSON.parse(localStorage.getItem('responses') || '[]');
  }

  function renderSatisfaction() {
    const data = getStoredData();
    const setores = [...new Set(data.map(d => d.setor))];

    let html = `<h2 class="administracao__satisfacao__titulo">Satisfação dos Usuários</h2>
      <label for="setorFiltro" class="administracao__satisfacao__texto">Filtrar por setor:</label>
      <select id="setorFiltro" class="form-select w-auto d-inline-block mb-3 ms-2" onchange="updateSatisfactionChart()">
        <option value="todos">Todos</option>
        ${setores.map(s => `<option value="${s}">${s}</option>`).join('')}
      </select>
      <canvas id="satisfactionChart" class = "administracao__satisfacao__canva" ></canvas>
      <h4 class="administracao__satisfacao__texto">Comentários dos Usuários</h4>
      <ul class="list-group administracao__satisfacao__comentarios" id="commentList"></ul>
      <img src="img/parceiros2.svg" alt="Parceiros" class="administracao__satisfacao__imagem">`;

    document.getElementById('adminContent').innerHTML = html;
    updateSatisfactionChart();
  }

  function updateSatisfactionChart() {
    const data = getStoredData();
    const setorSelecionado = document.getElementById('setorFiltro').value;

    const filtrados = setorSelecionado === 'todos' ? data : data.filter(d => d.setor === setorSelecionado);
    const contagem = {};
    filtrados.forEach(r => {
      if (!r.nivel) return;
      contagem[r.nivel] = (contagem[r.nivel] || 0) + 1;
    });

    const ctx = document.getElementById('satisfactionChart').getContext('2d');
    if (window.satisfacaoChart) window.satisfacaoChart.destroy();
    window.satisfacaoChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: Object.keys(contagem),
        datasets: [{
          label: 'Nível de Satisfação',
          data: Object.values(contagem),
          backgroundColor: ['#C96868', '#FADFA1', '#FFF4EA', '#7EACB5', '#4B8DAA'],
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          title: {
            display: true,
            text: `Satisfação - ${setorSelecionado === 'todos' ? 'Todos os Setores' : setorSelecionado}`
          }
        }
      }
    });

    const commentList = document.getElementById('commentList');
    commentList.innerHTML = '';
    filtrados.forEach(r => {
      if (r.observacao?.trim()) {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.textContent = `[${r.setor}] ${r.observacao.trim()}`;
        commentList.appendChild(li);
      }
    });
  }