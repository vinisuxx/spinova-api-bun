import { createId } from '@paralleldrive/cuid2';
import { relations } from 'drizzle-orm';
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { artistAlbums } from './artist-albums';
import { artistGenres } from './artist-genres';

export const artists = pgTable('artists', {
  id: text('id')
    .$defaultFn(() => createId())
    .primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const artistsRelations = relations(artists, ({ many }) => ({
  albums: many(artistAlbums),
  genres: many(artistGenres),
}));
