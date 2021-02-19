import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Urls extends BaseSchema {
  protected tableName = 'urls'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      //table.increments('id')
      table.string('new_url', 10).primary().notNullable()
      table.string('original_url').notNullable()
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
