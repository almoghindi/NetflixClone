import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  BeforeCreate,
  HasMany,
  PrimaryKey,
} from "sequelize-typescript";
@Table({
  timestamps: true,
  tableName: "Profiles",
  modelName: "Profile",
})
class Profile extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare userId: string;
  @Column({
    type: DataType.STRING,
  })
  declare name: string;
  @Column({
    type: DataType.STRING,
  })
  declare avatar: string;
  @Column({
    type: DataType.ENUM,
  })
  declare subscription: string;
  @Column({
    type: DataType.BOOLEAN,
  })
  declare isKid: boolean;
}
