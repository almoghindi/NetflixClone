import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
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
    allowNull: false,
  })
  declare user_id: string;
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare name: string;
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare avatar: string;
  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
  })
  declare isKid: boolean;

  @HasMany(() => FavoriteItem)
  declare favoriteItems: FavoriteItem[];
}
export default Profile;
