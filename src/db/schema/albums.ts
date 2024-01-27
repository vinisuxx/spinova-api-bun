import { createId } from '@paralleldrive/cuid2';
import { relations } from 'drizzle-orm';
import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { artistAlbums } from './artist-albums';

export const albums = pgTable('albums', {
  id: text('id')
    .$defaultFn(() => createId())
    .primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  coverUrl: text('cover_url').notNull(),
  label: text('label').notNull(),
  releasedDate: timestamp('released_date').notNull(),
  dimensions: integer('dimensions'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const albumsRelations = relations(albums, ({ many }) => ({
  artist: many(artistAlbums),
}));
