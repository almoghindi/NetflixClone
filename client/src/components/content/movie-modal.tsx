import React from 'react';
import { NewContent } from '../../types/new-content';
import { StarIcon } from '@heroicons/react/20/solid';
import Video from './video';

interface MovieModalProps {
  movie: NewContent;
  onClose: () => void;
}

const MovieModal: React.FC<MovieModalProps> = ({ movie, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
      <div className="relative w-4/5 mx-auto bg-black rounded-lg overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 lg:top-6 lg:right-6 text-white text-lg z-50"
        >
          Close
        </button>
        <div className="flex">
          <img
            className="h-120 w-80"
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            alt={movie.title}
          />
          <div className="block p-4">
            <p className="text-white text-4xl font-bold mb-2">{movie.title}</p>
            <p className="text-white flex items-center mb-4">
              {movie.release_date.split('-')[0]} | {movie.vote_average}
              <StarIcon width={20} height={20} className="text-yellow-500 ml-1" />
            </p>
            <p className="text-white">{movie.overview}</p>
          </div>
        </div>
        <div className="mt-4">
          <Video movieId={movie.id?.toString() || ''} type='movie'/>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;