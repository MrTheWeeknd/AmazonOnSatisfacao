function renderMealChoices() {
  const data = getStoredData();
  const categorias = ['proteina', 'carboidrato', 'salada', 'sobremesa'];

  let html = `<h2 class="titulo">Preferências de Refeições</h2>`;
  categorias.forEach(cat => {
    const contagem = {};
    data.forEach(r => {
      const item = r?.escolhaCardapio?.[cat];
      if (item) contagem[item] = (contagem[item] || 0) + 1;
    });

    html += `<div class="mb-5">
      <h5>${cat.charAt(0).toUpperCase() + cat.slice(1)}</h5>
      <canvas id="chart_${cat}" height="10"></canvas>
    </div>`;

    setTimeout(() => {
      const ctx = document.getElementById(`chart_${cat}`).getContext('2d');
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: Object.keys(contagem),
          datasets: [{
            data: Object.values(contagem),
            backgroundColor: ['#27374D', '#526D82', '#9DB2BF', '#DDE6ED', '#B2B2B2'],
          }]
        },
        options: {
          plugins: {
            legend: { position: 'right' },
            tooltip: { callbacks: { label: ctx => `${ctx.label}: ${ctx.raw}` } },
          }
        }
      });
    }, 50);
  });

  document.getElementById('adminContent').innerHTML = html;
}

