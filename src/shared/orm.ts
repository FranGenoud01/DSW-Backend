import { MikroORM } from "@mikro-orm/core"
import { MySqlDriver } from "@mikro-orm/mysql"
import { SqlHighlighter } from "@mikro-orm/sql-highlighter"
import * as dotenv from  "dotenv"
dotenv.config()

export const orm = await MikroORM.init({
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],

  clientUrl: process.env.MYSQL,
  highlighter: new SqlHighlighter,
  debug: true,
  driver: MySqlDriver,
  schemaGenerator: {
    //never in production
    disableForeignKeys: true,
    createForeignKeyConstraints: true,
    ignoreSchema: [],
  },
})

export const syncSchema = async () => {
  const generator = orm.getSchemaGenerator()
  /*   
  await generator.dropSchema()
  await generator.createSchema()
  */
  await generator.updateSchema()
}