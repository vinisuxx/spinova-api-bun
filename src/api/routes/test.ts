import { Elysia } from 'elysia';

export const test = new Elysia().get('/', () => 'Hello World');
