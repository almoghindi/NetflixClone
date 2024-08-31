import { Key } from "react";

export interface NewContent {
  [x: string]: any;
  id: Key | null | undefined;
  content: {
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
    video: boolean;
    vote_average: number;
    vote_count: number;
    title?: string; // Optional, since TV shows have `name` instead
    name?: string;  // Optional, since movies have `title` instead
    first_air_date?: string; // Only for TV shows
    release_date?: string; // Only for movies
    origin_country?: string[]; // Only for TV shows
  };
}

export interface filter {
  title: string;
  url: string;
}
