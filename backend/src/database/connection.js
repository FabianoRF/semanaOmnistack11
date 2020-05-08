const knex=require('knex');//importando o knex
const configuration= require('../../knexfile')//importando a conf do knex

const connection= knex(configuration.development);

module.exports=connection;