const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const path = require('path');

// Expor arquivos estáticos (CSS, JS, imagens)
server.use(express.static(path.join(__dirname, 'public')));
server.use(express.json()); // Possibilidade de usar JSON

// Configuração para interpretar dados vindos de formulários (POST)
server.use(bodyParser.urlencoded({ extended: true }));

// Exemplo GET para carregar o index.html
server.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); // Carrega o arquivo HTML como página inicial
});

// Exemplo POST (para um formulário fictício de cadastro)
server.post('/cadastro', (req, res) => {
    console.log(req.body);
    const { email, name } = req.body;

    // Simulando verificação simples de email
    if (email !== 'muca@email.com') {
        return res.sendFile(path.join(__dirname, 'views/401.html')); // Página de erro 401
    }
    res.sendFile(path.join(__dirname, 'views/home.html')); // Redireciona para home após cadastro
});

// Exemplo de retorno JSON (rota /pets)
server.get('/pets', (req, res) => {
    res.send({
        name: "Meu gato",
        idade: "4 anos",
        peso: "300kg"
    });
});

// Middleware para rotas não encontradas (404)
server.use((req, res, next) => {
    console.log('Página não encontrada');
    res.status(404).sendFile(path.join(__dirname, 'views/404.html')); // Página de erro 404
});

// Inicializando o servidor na porta 3000
server.listen(3000, () => {
    console.log("Servidor no ar na porta 3000...");
});
