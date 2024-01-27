import { relations } from 'drizzle-orm';
import { pgTable, primaryKey, text } from 'drizzle-orm/pg-core';
import { albums } from '.';
import { artists } from './artists';

export const artistAlbums = pgTable(
  'artist_albums',
  {
    artistId: text('artist_id')
      .notNull()
      .references(() => artists.id, {
        onDelete: 'cascade',
      }),
    albumId: text('album_id').references(() => albums.id, {
      onDelete: 'set null',
    }),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.artistId, table.albumId] }),
  }),
);

export const artistAlbumsRelations = relations(artistAlbums, ({ one }) => ({
  artist: one(artists, {
    fields: [artistAlbums.artistId],
    references: [artists.id],
  }),
  album: one(albums, {
    fields: [artistAlbums.albumId],
    references: [albums.id],
  }),
}));
