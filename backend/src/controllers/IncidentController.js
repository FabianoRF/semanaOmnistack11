const connection= require('../database/connection');//conexao com o bd

module.exports={
    async index(request, response){//lista com join e faz a paginação
        const { page=1 }=request.query;//utilizado para paginação

        const [count] =await connection('incidents').count();//conta a quantidade de registros no bd

        console.log(count);

        const incidents =await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')//join com a tabela incidents
        .limit(5)//llimita para 5 registros
        .offset((page-1 ) * 5)//pula 5 registros por pagina
        .select(['incidents.*',
                 'ongs.name', 
                 'ongs.email', 
                 'ongs.whatsapp', 
                 'ongs.city', 
                 'ongs.uf']);
        //no select acima é especificado em um array, os campos que se deseja pesquisar para nao sobrepor id

        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);
    },
    async create(request, response){
        const {title, description, value} = request.body;

        const ong_id =request.headers.authorization;

        const [id]= await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        })

        return response.json({id});//coloca se entre chaves pois assim retorna o nome do dado
    },

    

    async delete(request, response){
        const {id}=request.params;//parametro de rota
        const ong_id=request.headers.authorization;//veta o incident de uma ong eespecifica

        const incident =  await connection('incidents')
            .where('id', id)//onde o id é igual o parametro
            .select('ong_id')//id da ong
            .first()//recebe apenas o primeiro resultado da busca

        if(incident.ong_id != ong_id){//se o ong id do banco de dados for diferente da ong que deseja deletar
            return response.status(401).json({error:'Operation not permited. '});//erro 401 não autorizado
        }

        await connection('incidents').where('id', id).delete();//deleta caso seja permitido

        return response.status(204).send();//204: no content, sucesso mais sem conteudo
    }



}