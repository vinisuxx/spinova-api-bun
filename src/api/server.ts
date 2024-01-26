import cors from '@elysiajs/cors';
import { Elysia } from 'elysia';
import { authentication } from '@/api/authentication';
import chalk from 'chalk';
import { test } from '@/api/routes/test';

const app = new Elysia()
  .use(
    cors({
      credentials: true,
      allowedHeaders: ['content-type'],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
      origin: (request): boolean => {
        return !!request.headers.get('origin');
      },
    }),
  )
  .use(authentication)
  .use(test)
  .listen(3333);

console.log(
  chalk.green.bold(
    `🆙 Server running at http://${app.server?.hostname}:${app.server?.port}`,
  ),
);
