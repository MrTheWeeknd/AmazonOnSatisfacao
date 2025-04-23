// cadastro.js

// Tela de Cadastros
function showCadastros() {
    showScreen(`
      <div class="container py-5">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h2 class="titulo">Cadastros</h2>
          <button class="btn btn-secondary" onclick="screenAdminMain()">Voltar</button>
        </div>
        <div class="cadastros-container">
          <div class="card shadow-sm">
            <div class="card-body">
              <h5 class="card-title">Usuários</h5>
              <button class="btn btn-primary" onclick="showCadastrarUsuario()">Cadastrar Novo Usuário</button>
              <div id="listaUsuarios">
                </div>
            </div>
          </div>
          <div class="card shadow-sm">
            <div class="card-body">
              <h5 class="card-title">Empresas</h5>
              <button class="btn btn-primary" onclick="showCadastrarEmpresa()">Cadastrar Nova Empresa</button>
              <div id="listaEmpresas">
                </div>
            </div>
          </div>
        </div>
      </div>
    `);
    listarUsuarios();
    listarEmpresas();
}

// Tela de Cadastro de Usuário
function showCadastrarUsuario() {
    showScreen(`
      <div class="container py-5">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h2 class="titulo">Cadastrar Novo Usuário</h2>
          <button class="btn btn-secondary" onclick="showCadastros()">Voltar</button>
        </div>
        <form id="formCadastrarUsuario">
          <div class="mb-3">
            <label for="nomeUsuario" class="form-label">Nome</label>
            <input type="text" class="form-control" id="nomeUsuario" required>
          </div>
          <div class="mb-3">
            <label for="emailUsuario" class="form-label">Email</label>
            <input type="email" class="form-control" id="emailUsuario" required>
          </div>
          <div class="mb-3">
            <label for="senhaUsuario" class="form-label">Senha</label>
            <input type="password" class="form-control" id="senhaUsuario" required>
          </div>
          <button type="submit" class="btn btn-primary">Cadastrar</button>
        </form>
      </div>
    `);

    // Adiciona ouvinte de evento para o formulário
    document.getElementById('formCadastrarUsuario').addEventListener('submit', function(event) {
        event.preventDefault();
        cadastrarUsuario();
    });
}

// Tela de Cadastro de Empresa
function showCadastrarEmpresa() {
    showScreen(`
      <div class="container py-5">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h2 class="titulo">Cadastrar Nova Empresa</h2>
          <button class="btn btn-secondary" onclick="showCadastros()">Voltar</button>
        </div>
        <form id="formCadastrarEmpresa">
          <div class="mb-3">
            <label for="nomeEmpresa" class="form-label">Nome da Empresa</label>
            <input type="text" class="form-control" id="nomeEmpresa" required>
          </div>
          <div class="mb-3">
            <label for="cnpjEmpresa" class="form-label">CNPJ</label>
            <input type="text" class="form-control" id="cnpjEmpresa" required>
          </div>
          <div class="mb-3">
            <label for="enderecoEmpresa" class="form-label">Endereço</label>
            <input type="text" class="form-control" id="enderecoEmpresa" required>
          </div>
          <button type="submit" class="btn btn-primary">Cadastrar</button>
        </form>
      </div>
    `);

    // Adiciona ouvinte de evento para o formulário
    document.getElementById('formCadastrarEmpresa').addEventListener('submit', function(event) {
        event.preventDefault();
        cadastrarEmpresa();
    });
}

// Lógica de Cadastro de Usuário (Simples - Substitua por Backend)
function cadastrarUsuario() {
    const nome = document.getElementById('nomeUsuario').value;
    const email = document.getElementById('emailUsuario').value;
    const senha = document.getElementById('senhaUsuario').value;

    // Aqui você faria a lógica para salvar o usuário (localStorage, API, etc.)
    console.log('Dados do usuário:', {
        nome,
        email,
        senha
    });
    alert('Usuário cadastrado (simulação)');

    showCadastros();
}

// Lógica de Cadastro de Empresa (Simples - Substitua por Backend)
function cadastrarEmpresa() {
    const nome = document.getElementById('nomeEmpresa').value;
    const cnpj = document.getElementById('cnpjEmpresa').value;
    const endereco = document.getElementById('enderecoEmpresa').value;

    // Aqui você faria a lógica para salvar a empresa (localStorage, API, etc.)
    console.log('Dados da empresa:', {
        nome,
        cnpj,
        endereco
    });
    alert('Empresa cadastrada (simulação)');

    showCadastros();
}

// Listagem de Usuários (Simples - Substitua por Backend)
function listarUsuarios() {
    // Lógica para obter e exibir a lista de usuários
    // Para simplificar, vamos exibir apenas uma mensagem temporária
    document.getElementById('listaUsuarios').innerHTML = '<p>Lista de usuários (em desenvolvimento)</p>';
}

// Listagem de Empresas (Simples - Substitua por Backend)
function listarEmpresas() {
    // Lógica para obter e exibir a lista de empresas
    // Para simplificar, vamos exibir apenas uma mensagem temporária
    document.getElementById('listaEmpresas').innerHTML = '<p>Lista de empresas (em desenvolvimento)</p>';
}