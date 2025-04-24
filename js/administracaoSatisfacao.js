  function getStoredData() {
    return JSON.parse(localStorage.getItem('responses') || '[]');
  }

  function renderSatisfaction() {
    const data = getStoredData();
    const setores = [...new Set(data.map(d => d.setor))];

    let html = `<h2 class="satisfacao__titulo">Satisfação dos Usuários</h2>
      <label for="setorFiltro">Filtrar por setor:</label>
      <select id="setorFiltro" class="form-select w-auto d-inline-block mb-3 ms-2" onchange="updateSatisfactionChart()">
        <option value="todos">Todos</option>
        ${setores.map(s => `<option value="${s}">${s}</option>`).join('')}
      </select>
      <canvas id="satisfactionChart" height="100"></canvas>
      <h4 class="mt-4">Comentários dos Usuários</h4>
      <ul class="list-group mt-2" id="commentList"></ul>`;

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
          backgroundColor: ['#27374D', '#526D82', '#9DB2BF', '#DDE6ED']
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