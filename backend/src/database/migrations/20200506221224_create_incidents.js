
exports.up = function(knex) {
    return knex.schema.createTable('incidents', function (table) {
        table.increments();//auto increment
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.string('value').notNullable();
        table.string('ong_id').notNullable();//chave estrangeira
        table.foreign('ong_id').references('id').inTable('ongs')//falando a referencia
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('incidents');
};
