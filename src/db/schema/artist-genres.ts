import { relations } from 'drizzle-orm';
import { pgTable, primaryKey, text } from 'drizzle-orm/pg-core';
import { artists } from './artists';
import { genres } from './genres';

export const artistGenres = pgTable(
  'artist_genres',
  {
    artistId: text('artist_id')
      .notNull()
      .references(() => artists.id, {
        onDelete: 'cascade',
      }),
    genreId: text('genre_id').references(() => genres.id, {
      onDelete: 'cascade',
    }),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.artistId, table.genreId] }),
  }),
);
export const artistGenresRelations = relations(artistGenres, ({ one }) => ({
  artist: one(artists, {
    fields: [artistGenres.artistId],
    references: [artists.id],
  }),
  genres: one(genres, {
    fields: [artistGenres.genreId],
    references: [genres.id],
  }),
}));
