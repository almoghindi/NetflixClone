import {
  Model,
  Column,
  DataType,
  ForeignKey,
  Table,
} from "sequelize-typescript";
import Profile from "./profile";

@Table({
  tableName: "favorite_items",
  timestamps: true,
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
    allowNull: false,
  })
  declare profile_id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare content_id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare media_type: string; // Can be 'movie' or 'tv'

  // Shared fields
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  declare adult: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare backdrop_path: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare original_language: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  declare overview: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare poster_path: string;

  @Column({
    type: DataType.JSON,
    allowNull: true,
  })
  declare genre_ids: number[];

  @Column({
    type: DataType.FLOAT,
    allowNull: true,
  })
  declare popularity: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: true,
  })
  declare vote_average: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  declare vote_count: number;

  // Movie-specific fields
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare original_title: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare title: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare release_date: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  declare video: boolean;

  // TV show-specific fields
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare name: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare original_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare first_air_date: string;

  @Column({
    type: DataType.JSON,
    allowNull: true,
  })
  declare origin_country: string[];
}
export default FavoriteItem;
