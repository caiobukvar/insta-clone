# Mini Insta
## O que o usuário PODE fazer?

- Login
- Cadastro
- Ver dados do perfil
- Editar dados do perfil
- Ver postagens de outros
    - Ver número de curtidas
    - Curtir postagens de outros
        - com 2 cliques na tela ou clique no coração
    - Descurtir postagens
        - ao mandar a requisição de curtir para algo já curtido
    - Comentar as postagens de outros
- Ver comentários em uma postagem

## O que o usuário NÃO PODE fazer?

- Ver a localização do post
- Ver quem curtiu o post
- Curtir um comentário
- Comentar outros comentários (reply)

## Endpoints

### POST - Login

#### Dados enviados
- username
- senha

#### Dados retornados
- sucesso / erro
- token

#### Objetivos Gerais
- Validar username e senha
- Buscar o usuario no database (db)
- Verificar se a senha informada está correta
- Gerar token de autenticação
- Retornar os dados do usuário e o token

---

### POST - Cadastro

#### Dados enviados
- username
- senha (maior que 5 caracteres)

#### Dados retornados
- sucesso / erro

#### Objetivos Gerais
- Validar username e senha
- Verificar se username é único no db (se já existe)
- Criptografar a senha (para salvar o hash no db)
- Cadastrar o usuário no db

---

### GET - Perfil

#### Dados enviados
- token (que tem id ou username)

#### Dados retornados
- URL da foto TEXT
- Nome TEXT
- username TEXT
- Site TEXT
- Bio TEXT
- Email TEXT
- Telefone TEXT
- Genero TEXT

#### Objetivos Gerais
- Receber token no header e validar o mesmo
- Buscar o cadastro do usuário com a info do token
- Retornar os dados do usuário

---

### PUT - Perfil

- token
- URL da foto
- Nome
- Username
- Site
- Bio
- Email
- Telefone
- Genero
- Senha

#### Dados retornados
- Sucesso ou erro

#### Objetivos Gerais
- Receber token no header e validar o mesmo
- Buscar o cadastro do usuário com a info do token
- Exigir modificação em ao menos um campo para poder atualizar
- Criptografar a senha caso ela seja alterada/informada
- Verificar email e username já existem no db, caso informados
- Atualizar o registro do usuário no db
- Retornar sucesso ou erro

---

### GET - Postagens

#### Dados enviados
- token
- offset (quando acabarem as postagens, pegar novas / mais)

#### Dados retornados
- Postagens [] 
    - id 
    - já curtiu o post?
    - usuário
        - URL da foto TEXT
        - username TEXT
        - perfil verificado BOOLEAN
    - Fotos [] 
        - foto 1
        - foto 2
        - ...
    - Número de curtidas
    - Comentários []
        - username
        - texto
    - Data da postagem 

#### Objetivos Gerais
- Receber token no header e validar o mesmo
- Buscar o cadastro do usuário com a info do token
- Retornar postagens de outras pessoas

---

### POST - Postagens

#### Dados enviados
- token
- texto
- array com fotos []

#### Dados retornados
- Sucesso ou erro

#### Objetivos Gerais
- Receber token no header e validar o mesmo
- Buscar o cadastro do usuário com a info do token
- Exigir ao menos uma foto no array
- Cadastrar a postagem para o usuário logado
- Cadastro das fotos da postagem 
- Retornar sucesso ou erro

---

### POST - Curtir

#### Dados enviados
- token ( username ou id usuario)
- id da postagem
- 
#### Dados retornados
- Sucesso ou erro

#### Objetivos Gerais
- Receber token no header e validar o mesmo
- Buscar o cadastro do usuário com a info do token
- Buscar o cadastro da postagem com o id informado
- Verificar se o usuário já curtiu a postagem
- Cadastrar curtida da postagem no db
- Retornar sucesso ou erro

---

### POST - Comentar

#### Dados enviados
- token ( username ou id usuario)
- texto do comentário
- id da postagem


#### Dados retornados
- Sucesso ou erro

#### Objetivos Gerais
- Receber token no header e validar o mesmo
- Buscar o cadastro do usuário com a info do token
- Buscar o cadastro da postagem com o id informado
- Validar o texto
- Buscar a postagem pelo id informado
- Cadastrar comentário da postagem
- Retornar sucesso ou erro