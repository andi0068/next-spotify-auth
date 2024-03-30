import { cookies } from 'next/headers';

type SessionData = {
  access_token: string;
  refresh_token: string;
};

export function env() {
  return {
    CLIENT_ID: process.env.CLIENT_ID!,
    CLIENT_SECRET: process.env.CLIENT_SECRET!,
    REDIRECT_URI: process.env.REDIRECT_URI!,
  };
}

export const Session = {
  key: 'session',
  set(data: SessionData | null) {
    if (data === null) return cookies().set(Session.key, '', { expires: new Date(0) });
    return cookies().set(
      Session.key,
      JSON.stringify({
        access_token: data.access_token,
        refresh_token: data.refresh_token,
      } satisfies SessionData),
      { httpOnly: true },
    );
  },
  get(): SessionData | null {
    const cookie = cookies().get(Session.key);
    return cookie?.value ? JSON.parse(cookie.value) : null;
  },
};
