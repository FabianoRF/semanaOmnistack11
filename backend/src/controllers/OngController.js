const crypto =require('crypto');
const connection= require('../database/connection');//conexao com o bd

module.exports ={
    async index(request, response){//listar
        const ongs = await connection('ongs').select('*');
    
        return response.json(ongs);
    },

    async create(request, response) {

    const {name, email, whatsapp, city, uf}  = request.body;//acessar dados do corpo da requisição
    const id=crypto.randomBytes(4).toString('HEX');//gera 4 carasteres enm hexadecimal
   
    await connection('ongs').insert({//await significa que ele irá esperar a resposta para proseguir
        id,
        name,
        email,
        whatsapp,
        city,
        uf,
    });

    return response.json({ id });
    }
}