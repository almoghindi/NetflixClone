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
  ForeignKey,
} from "sequelize-typescript";
import Profile from "./profile";

@Table({
  timestamps: true,
  tableName: "FavoriteItems",
  modelName: "FavoriteItem",
})
class FavoriteItem extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;
  @ForeignKey(() => Profile)
  @Column({
    type: DataType.UUID,
  })
  declare profile_id: string;
  @Column({
    type: DataType.STRING,
  })
  declare content_id: string;
}
export default FavoriteItem;
