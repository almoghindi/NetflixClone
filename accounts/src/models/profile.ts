import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import FavoriteItem from "./favorite-item";

enum SubscriptionType {
  BASIC = "BASIC",
  STANDART = "STANDART",
  PREMIUM = "PREMIUM",
}

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
    type: DataType.ENUM(...Object.values(SubscriptionType)),
    allowNull: false,
  })
  declare subscription: SubscriptionType;
  @Column({
    type: DataType.BOOLEAN,
  })
  declare isKid: boolean;

  @HasMany(() => FavoriteItem)
  declare favoriteItems: FavoriteItem[];
}
export default Profile;
