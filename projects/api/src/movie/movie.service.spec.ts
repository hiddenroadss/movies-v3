import { Test, TestingModule } from '@nestjs/testing';
import { MovieService } from './movie.service';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaModule } from '../prisma/prisma.module';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

describe('MovieService', () => {
  let service: MovieService;
  const movieMock = {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [
        MovieService,
        {
          provide: PrismaService,
          useValue: {
            movie: movieMock,
            tag: {
              findMany: jest.fn().mockResolvedValue([]),
              createMany: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<MovieService>(MovieService);
  });

  it('is defined', () => {
    expect(service).toBeDefined();
  });

  it('create a movie', async () => {
    const movieData: CreateMovieDto = {
      title: 'Test Movie',
      director: 'Test Director',
      releaseDate: new Date('2022-01-01'),
      tags: [{ id: 1, name: 'drama' }],
    };
    movieMock.create.mockImplementation(() =>
      Promise.resolve({ ...movieData, id: 1 })
    );

    const createdMovie = await service.create(movieData);

    expect(createdMovie).toHaveProperty('id');
    expect(createdMovie.title).toEqual(movieData.title);
    expect(createdMovie.director).toEqual(movieData.director);
    expect(createdMovie.releaseDate).toEqual(movieData.releaseDate);
    expect(createdMovie.tags).toEqual(expect.arrayContaining(movieData.tags));
  });

  it('update a movie', async () => {
    const movieId = 1;
    const movieData: UpdateMovieDto = {
      title: 'Updated Test Movie',
      director: 'Updated Test Director',
      releaseDate: new Date('2022-01-02'),
      tags: [{ id: 1, name: 'comedy' }],
    };
    movieMock.update.mockImplementation(() =>
      Promise.resolve({ ...movieData, id: movieId })
    );

    const updatedMovie = await service.update(movieId, movieData);

    expect(updatedMovie).toHaveProperty('id');
    expect(updatedMovie.id).toBe(movieId);
    expect(updatedMovie.title).toEqual(movieData.title);
    expect(updatedMovie.director).toEqual(movieData.director);
    expect(updatedMovie.releaseDate).toEqual(movieData.releaseDate);
    expect(updatedMovie.tags).toEqual(expect.arrayContaining(movieData.tags));
  });

  it('finds all movies', async () => {
    const movies = [
      {
        id: 1,
        title: 'Test Movie 1',
        director: 'Test Director 1',
        releaseDate: new Date('2022-01-01'),
        tags: [{ id: 1, name: 'test1' }],
      },
      {
        id: 2,
        title: 'Test Movie 2',
        director: 'Test Director 2',
        releaseDate: new Date('2022-01-02'),
        tags: [{ id: 2, name: 'test2' }],
      },
    ];

    movieMock.findMany.mockImplementation(() => Promise.resolve(movies));

    const foundMovies = await service.findAll();

    expect(foundMovies).toEqual(movies);
  });

  it('finds one movie by id', async () => {
    const movie = {
      id: 1,
      title: 'Test Movie',
      director: 'Test Director',
      releaseDate: new Date('2022-01-01'),
      tags: [{ id: 1, name: 'test' }],
    };

    movieMock.findUnique.mockImplementation(() => Promise.resolve(movie));

    const foundMovie = await service.findOne(movie.id);

    expect(foundMovie).toEqual(movie);
  });
});
