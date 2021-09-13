const express = require('express');
const usuarios = require('./controladores/usuarios');
const login = require('./controladores/login');
const verificaLogin = require('./filtros/verificaLogin');
const postagens = require('./controladores/postagens');


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
rotas.post('/postagens', postagens.novaPostagem);
rotas.get('/postagens', postagens.feed);
rotas.post('/postagens/:postagemId/curtir', postagens.curtir);
rotas.post('/postagens/:postagemId/comentar', postagens.comentar);

module.exports = rotas;