const express = require('express');
const usuarios = require('./controladores/usuarios');
const login = require('./controladores/login');
const verificaLogin = require('./filtros/verificaLogin');

const rotas = express();

//cadastro usuário
rotas.post('/cadastro', usuarios.cadastrarUsuario);

//Login
rotas.post('/login', login.login);

// filtro de verificação (middleware) - usuário está logado?
rotas.use(verificaLogin);

// obter e atualizar perfil do usuário logado
rotas.get('/perfil', usuarios.obterPerfil);
rotas.put('/perfil', usuarios.atualizarPerfil);

// Postagens

module.exports = rotas;