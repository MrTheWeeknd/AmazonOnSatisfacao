function logoutAdmin() {
    screenAdminLogin(); // volta para tela de login sem recarregar a página
}


function exportData() {
  const formato = prompt("Escolha o formato de exportação: CSV ou PDF").toLowerCase();
  const data = getStoredData();

  if (!data.length) {
    alert("Não há dados para exportar.");
    return;
  }

  if (formato === 'csv') {
    const csv = [Object.keys(data[0]).join(',')]
      .concat(data.map(obj => Object.values(obj).map(v => JSON.stringify(v)).join(',')))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'respostas.csv';
    link.click();
  }

  else if (formato === 'pdf') {
    const win = window.open('', '_blank');
    win.document.write(`
      <html><head><title>Exportar PDF</title></head><body>
      <h1>Relatório de Respostas</h1>
      <table border="1" cellspacing="0" cellpadding="5">
        <thead><tr>${Object.keys(data[0]).map(k => `<th>${k}</th>`).join('')}</tr></thead>
        <tbody>
          ${data.map(row => `<tr>${Object.values(row).map(cell => `<td>${cell}</td>`).join('')}</tr>`).join('')}
        </tbody>
      </table>
      </body></html>
    `);
    win.document.close();
    win.print();
  }

  else {
    alert("Formato inválido. Digite CSV ou PDF.");
  }
}


function screenAdminDashboard() {
    showScreen(`
      <div class="d-flex">
        <div class="p-3 bg-dark text-white" style="width: 250px; min-height: 100vh;">
          <h4>Admin</h4>
          <hr>
          <button class="btn btn-outline-light w-100 mb-2" onclick="renderSatisfaction()">Satisfação</button>
          <button class="btn btn-outline-light w-100 mb-2" onclick="renderMealChoices()">Refeições</button>
  
          <div class="dropdown mb-2">
            <button class="btn btn-outline-light dropdown-toggle w-100" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              Exportar Dados
            </button>
            <ul class="dropdown-menu w-100">
              <li><a class="dropdown-item" href="#" onclick="exportData('csv')">Exportar como CSV</a></li>
              <li><a class="dropdown-item" href="#" onclick="exportData('pdf')">Exportar como PDF</a></li>
            </ul>
          </div>
  
          <button class="btn btn-outline-light w-100 mt-2" onclick="logoutAdmin()">Sair</button>
        </div>
        <div class="p-4 flex-grow-1" id="adminContent"></div>
      </div>
    `);
    renderSatisfaction();
  }
  