import qs from 'query-string';

import { env } from '@/utils';

export function getAuthorizeUrl(scope = 'user-read-private user-read-email') {
  const { CLIENT_ID, REDIRECT_URI } = env();

  return `https://accounts.spotify.com/authorize?${qs.stringify({
    response_type: 'code',
    client_id: CLIENT_ID,
    scope,
    redirect_uri: REDIRECT_URI,
  })}`;
}

export async function getAccessToken(code: string): Promise<{
  access_token: string;
  token_type: string;
  scope: string;
  expires_in: number;
  refresh_token: string;
}> {
  const { REDIRECT_URI } = env();
  const { url, ...init } = getTokenReqConfig({
    code,
    redirect_uri: REDIRECT_URI,
    grant_type: 'authorization_code',
  });

  return fetch(url, init).then((res) => res.json());
}

export async function getRefreshToken(refresh_token: string): Promise<{
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
}> {
  const { url, ...init } = getTokenReqConfig({
    grant_type: 'refresh_token',
    refresh_token,
  });

  return fetch(url, init).then((res) => res.json());
}

function getTokenReqConfig(body: Record<string, string>) {
  const { CLIENT_ID, CLIENT_SECRET } = env();
  const BASIC = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');

  return {
    url: 'https://accounts.spotify.com/api/token',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${BASIC}`,
    },
    body: new URLSearchParams(body),
  };
}
