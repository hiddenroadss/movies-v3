import { Movie } from '@shared/types';

export const movieStub: Movie = {
  id: 1,
  title: 'test',
  director: 'test',
  releaseDate: new Date(),
  tags: [{ id: 1, name: 'test' }],
  description: 'test',
  poster: 'test',
};

export const moviesStub: Movie[] = [
  {
    id: 1,
    title: 'The Shawshank Redemption',
    director: 'Frank Darabont',
    releaseDate: new Date('1994-10-14'),
    tags: [
      { id: 1, name: 'Drama' },
      { id: 2, name: 'Crime' },
    ],
    description:
      'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    poster: 'https://www.imdb.com/title/tt0111161/mediaviewer/rm3582021376',
  },
  {
    id: 2,
    title: 'The Godfather',
    director: 'Francis Ford Coppola',
    releaseDate: new Date('1972-03-24'),
    tags: [
      { id: 1, name: 'Drama' },
      { id: 2, name: 'Crime' },
    ],
    description:
      'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
    poster: 'https://www.imdb.com/title/tt0068646/mediaviewer/rm3582021376',
  },
  {
    id: 3,
    title: 'The Dark Knight',
    director: 'Christopher Nolan',
    releaseDate: new Date('2008-07-18'),
    tags: [
      { id: 1, name: 'Drama' },
      { id: 2, name: 'Action' },
    ],
    description:
      'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    poster: 'https://www.imdb.com/title/tt0468569/mediaviewer/rm3582021376',
  },
  {
    id: 4,
    title: 'The Lord of the Rings: The Fellowship of the Ring',
    director: 'Peter Jackson',
    releaseDate: new Date('2001-12-19'),
    tags: [
      { id: 1, name: 'Fantasy' },
      { id: 2, name: 'Adventure' },
    ],
    description:
      'A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.',
    poster: 'https://www.imdb.com/title/tt0120737/mediaviewer/rm3582021376',
  },
];
