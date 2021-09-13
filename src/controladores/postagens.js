const knex = require('../conexao');

const novaPostagem = async (req, res) => {
    const { id } = req.usuario;
    const { texto, fotos } = req.body;

    if (!fotos || fotos.length === 0) {
        return res.status(404).json('É necessário informar pelo menos uma foto');
    }

    try {
        const postagem = await knex('postagens').insert({ texto, usuario_id: id }).returning('*');

        if (!postagem) {
            return res.status(400).json('Não foi possível concluir a postagem');
        }

        for (const foto of fotos) {
            foto.postagem_id = postagem[0].id;
        }

        const fotosCadastradas = await knex('fotos_postagens').insert(fotos);

        if (!fotosCadastradas) {
            await knex('postagens').where({ id: postagem[0].id }).del();
            return res.status(400).json('Não foi possível concluir a postagem');
        }

        return res.status(200).json('Postagem concluída com sucesso!');
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const curtir = async (req, res) => {
    const { id } = req.usuario;
    const { postagem_id } = req.params;

    try {
        const postagem = await knex('postagens').where({ id: postagem_id }).first();

        if (!postagem) {
            return res.status(404).json("Postagem não encontrada");
        }

        const jaCurtiu = await knex('curtidas_postagens')
            .where({ usuario_id: id, postagem_id: postagem.id })
            .first();

        if (jaCurtiu) {
            return res.status(400).json('Postagem já curtida!');
        }

        const curtida = await knex('curtidas_postagens')
            .insert({
                usuario_id: id,
                postagem_id: postagem.id
            });

        if (!curtida) {
            return res.status(400).json('Não foi possível curtir esta postagem.');
        }

        return res.status(200).json('Postagem curtida com sucesso');
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const curtir = async (req, res) => {
    const { id } = req.usuario;
    const { postagem_id } = req.params;
    const { texto } = req.body;

    if (!texto) {
        return res.status(404).json("Necessário informar um texto para comentar.");
    }

    try {
        const postagem = await knex('postagens').where({ id: postagem_id }).first();

        if (!postagem) {
            return res.status(404).json("Postagem não encontrada");
        }

        const comentario = await knex('comentarios_postagens')
            .insert({
                usuario_id: id,
                postagem_id: postagem.id,
                texto
            });

        if (!comentario) {
            return res.status(400).json('Não foi possível comentar esta postagem.');
        }

        return res.status(200).json('Postagem curtida com sucesso');
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = {
    novaPostagem,
    curtir,
    comentar
};