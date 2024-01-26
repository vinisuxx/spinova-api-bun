import { relations } from 'drizzle-orm';
import { pgTable, text } from 'drizzle-orm/pg-core';
import { createId } from '@paralleldrive/cuid2';
import { albums } from '.';
import { artists } from './artists';

export const artistAlbums = pgTable('artist_albums', {
  id: text('id')
    .$defaultFn(() => createId())
    .primaryKey(),
  artistId: text('artist_id')
    .notNull()
    .references(() => artists.id, {
      onDelete: 'cascade',
    }),
  albumId: text('album_id').references(() => albums.id, {
    onDelete: 'set null',
  }),
});

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
