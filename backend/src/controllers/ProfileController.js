const connection= require('../database/connection');//conexao com o bd

module.exports ={
    async index(request, response){//lista os incidentes de determinada ong
        const ong_id= request.headers.authorization;

        const incidents = await connection('incidents')
            .where('ong_id', ong_id)
            .select('*')

        return response.json(incidents);
    }
}