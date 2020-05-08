//seção para login
const connection= require('../database/connection');//conexao com o bd

module.exports = {
    async create(request, response) {
        const { id } = request.body;

        const ong = await connection('ongs')
            .where('id', id)
            .select('name')
            .first();
        
        if(!ong){
            return response.status(400).json({ error: 'No found ONG with this ID'});
        }
        return response.json(ong)
    }
}