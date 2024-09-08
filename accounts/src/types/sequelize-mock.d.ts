// src/types/sequelize-mock.d.ts

declare module "sequelize-mock" {
  import { Sequelize, Model, BuildOptions } from "sequelize";

  class SequelizeMock extends Sequelize {
    define(modelName: string, values?: object, options?: object): typeof Model;
  }

  export default SequelizeMock;
}
