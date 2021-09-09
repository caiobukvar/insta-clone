create table usuarios (
  id serial primary key,
  nome text,
  imagem text,
  username text not null unique,
  email text unique,
  site text,
  bio text,
  telefone text,
  genero text,
  senha text not null,
  verified boolean default false
  );

create table postagens (
  id serial primary key,
  usuario_id int not null,
  data timestamptz default now(),
  texto text,
  foreign key (usuario_id) references usuarios (id)
  );

create table fotos_postagens (
  id serial primary key,
  postagem_id int not null,
  imagem text not null,
  foreign key (postagem_id) references postagens (id)
  );
  
create table comentarios_postagens (
  id serial primary key,
  texto text not null,
  data timestamptz default now(),
  usuario_id int not null,
  postagem_id int not null,
  foreign key (usuario_id) references usuarios (id),
  foreign key (postagem_id) references postagens (id)
  );

create table curtidas_postagens (
  usuario_id int not null,
  postagem_id int not null,
  data timestamptz default now(),
  foreign key (usuario_id) references usuarios (id),
  foreign key (postagem_id) references postagens (id)
  );

