import { describe, expect, it } from 'vitest';
import { toSupportedMovie, toSupportedMovieDetails } from './utils';
import type { TmdbMovie, TmdbMovieDetails } from './schemas/MoviesTypes';

describe('utils', () => {
  describe('toSupportedMovie', () => {
    it('converts a TMDB movie while omitting adult and video', () => {
      const movie: TmdbMovie = {
        adult: false,
        backdrop_path: '/backdrop.jpg',
        genre_ids: [18, 35],
        id: 101,
        original_language: 'fr',
        original_title: 'Film original',
        overview: 'Résumé du film',
        popularity: 42.5,
        poster_path: '/poster.jpg',
        release_date: '2026-01-15',
        title: 'Film',
        video: false,
        vote_average: 8.2,
        vote_count: 1200,
      };

      expect(toSupportedMovie(movie)).toEqual({
        backdrop_path: '/backdrop.jpg',
        genre_ids: [18, 35],
        id: 101,
        original_language: 'fr',
        original_title: 'Film original',
        overview: 'Résumé du film',
        popularity: 42.5,
        poster_path: '/poster.jpg',
        release_date: '2026-01-15',
        title: 'Film',
        vote_average: 8.2,
        vote_count: 1200,
      });
    });
  });
  describe('toSupportedMovieDetails', () => {
    it('converts movie details while omitting unsupported TMDB properties', () => {
      const movie: TmdbMovieDetails = {
        adult: false,
        backdrop_path: '/backdrop.jpg',
        id: 202,
        original_language: 'en',
        original_title: 'Original movie',
        overview: 'Movie overview',
        popularity: 64.3,
        poster_path: null,
        release_date: '2025-06-20',
        title: 'Movie',
        video: true,
        vote_average: 7.9,
        vote_count: 850,
        genres: [{ id: 12, name: 'Adventure' }],
        tagline: 'A great adventure',
        production_companies: [
          {
            id: 303,
            logo_path: null,
            name: 'Production Company',
            origin_country: 'US',
          },
        ],
      };

      expect(toSupportedMovieDetails(movie)).toEqual({
        backdrop_path: '/backdrop.jpg',
        genres: [{ id: 12, name: 'Adventure' }],
        id: 202,
        original_language: 'en',
        original_title: 'Original movie',
        overview: 'Movie overview',
        popularity: 64.3,
        poster_path: null,
        release_date: '2025-06-20',
        tagline: 'A great adventure',
        title: 'Movie',
        vote_average: 7.9,
        vote_count: 850,
      });
    });
  });
});

//
