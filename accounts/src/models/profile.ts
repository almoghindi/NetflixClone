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
import FavoriteItem from "./favorite-item";
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
  declare user_id: string;
  @Column({
    type: DataType.STRING,
  })
  declare name: string;
  @Column({
    type: DataType.STRING,
  })
  declare avatar: string;
  @Column({
    type: DataType.STRING,
  })
  declare subscription: string;
  @Column({
    type: DataType.BOOLEAN,
  })
  declare isKid: boolean;

  // @CreatedAt
  // declare created_at: Date;
  // @UpdatedAt
  // declare updated_at: Date;
  @HasMany(() => FavoriteItem)
  declare favoriteItems: FavoriteItem[];
}
export default Profile;
