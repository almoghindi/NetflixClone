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
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    name: string;
  };
}

export interface filter {
  title: string;
  url: string;
}
