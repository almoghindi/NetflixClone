import FavoriteItem from "../models/favorite-item";

interface MovieItem {
  id: number;
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  media_type: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface TVShowItem {
  id: number;
  name: string;
  original_name: string;
  overview: string;
  poster_path: string;
  media_type: string;
  adult: boolean;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  origin_country: string[];
}

export const convertFavoriteItemToContent = (
  favoriteItem: FavoriteItem
): MovieItem | TVShowItem => {
  const commonFields = {
    id: parseInt(favoriteItem.content_id),
    backdrop_path: favoriteItem.backdrop_path,
    media_type: favoriteItem.media_type,
    adult: favoriteItem.adult,
    original_language: favoriteItem.original_language,
    overview: favoriteItem.overview,
    poster_path: favoriteItem.poster_path,
    genre_ids: favoriteItem.genre_ids,
    popularity: favoriteItem.popularity,
    vote_average: favoriteItem.vote_average,
    vote_count: favoriteItem.vote_count,
  };

  if (favoriteItem.media_type === "movie") {
    return {
      ...commonFields,
      original_title: favoriteItem.original_title!,
      title: favoriteItem.title!,
      release_date: favoriteItem.release_date!,
      video: favoriteItem.video!,
    } as MovieItem;
  } else if (favoriteItem.media_type === "tv") {
    return {
      ...commonFields,
      name: favoriteItem.title!, // Assuming `title` was stored as `name` in FavoriteItem
      original_name: favoriteItem.original_title!,
      first_air_date: favoriteItem.release_date!,
      origin_country: favoriteItem.genre_ids.map(String), // Convert to string[]
    } as TVShowItem;
  }

  throw new Error(`Unknown media type: ${favoriteItem.media_type}`);
};
