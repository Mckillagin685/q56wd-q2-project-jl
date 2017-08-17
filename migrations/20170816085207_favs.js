'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('favs', (table) => {
    table.increments();
    table.string('location').notNullable().defaultTo('');
    table.string('employer').notNullable().defaultTo('');
    table.string('job_title').notNullable().defaultTo('');
    table.string('post_age').notNullable().defaultTo('');
    table.text('job_description').notNullable().defaultTo('');
    table.string('job_skills').notNullable().defaultTo('');
    table.string('job_terms').notNullable().defaultTo('');
    table.string('job_url').notNullable().unique('job_url').defaultTo('');
    table.string('user_id').notNullable().defaultTo('');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('favs');
};
