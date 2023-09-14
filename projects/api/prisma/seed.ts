import { PrismaClient, Movie } from '@prisma/client';

const prisma = new PrismaClient();

type MovieData = Omit<Movie, 'id'>;
const tags = ['funny', 'terrifying', 'dramatic', 'thrilling'];

function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

const startDate = new Date('2000-01-01');
const endDate = new Date('2022-12-31');

async function main() {
  const movies: MovieData[] = new Array(50).fill(null).map((_, index) => ({
    title: `Movie ${index}`,
    director: `Director ${index}`,
    releaseDate: randomDate(startDate, endDate),
    tags: tags,
    poster: 'https://example.com/movie1.jpg',
    createdAt: randomDate(startDate, endDate),
    updatedAt: randomDate(startDate, endDate),
    description: 'SOME RANDOM',
  }));

  for (const movie of movies) {
    await prisma.movie.create({ data: movie });
  }

  console.log('Database seeded with movies.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
