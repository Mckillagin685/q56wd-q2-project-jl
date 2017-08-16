'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('favs', (table) => {
    table.increments();
    table.integer('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE').index();
    table.string('location').notNullable().defaultTo('');
    table.string('employer').notNullable().defaultTo('');
    table.string('job_title').notNullable().defaultTo('');
    table.string('post_age').notNullable().defaultTo('');
    table.string('job_description').notNullable().defaultTo('');
    table.string('job_skills').notNullable().defaultTo('');
    table.string('job_terms').notNullable().defaultTo('');
    table.string('url').notNullable().defaultTo('');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('favs');
};
