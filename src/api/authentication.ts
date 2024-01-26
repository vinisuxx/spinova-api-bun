import Elysia, { Static, t } from 'elysia';
import cookie from '@elysiajs/cookie';
import jwt from '@elysiajs/jwt';
import { env } from '@/env';

const jwtPayloadSchema = t.Object({
  id: t.String(),
});

export const authentication = new Elysia()
  .use(
    jwt({
      name: 'jwt',
      secret: env.JWT_SECRET_KEY,
      schema: jwtPayloadSchema,
    }),
  )
  .use(cookie())
  .derive(({ jwt, setCookie, removeCookie }) => {
    return {
      signIn: async (payload: Static<typeof jwtPayloadSchema>) => {
        setCookie('@spinova:auth', await jwt.sign(payload), {
          httpOnly: true,
          maxAge: 7 * 86400,
          path: '/',
        });
      },
      signOut: () => {
        removeCookie('@spinova:auth');
      },
    };
  });
