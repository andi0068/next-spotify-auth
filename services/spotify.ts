import axios, { isAxiosError } from 'axios';

import { Session } from '@/utils';

import { getRefreshToken } from './auth';

export const api = axios.create({ baseURL: 'https://api.spotify.com/v1' });

api.interceptors.request.use((config) => {
  const session = Session.get();

  if (session) {
    config.headers.Authorization = `Bearer ${session.access_token}`;
  }

  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (!isAxiosError(err) || !err.response || !err.config) {
      return Promise.reject(err);
    }

    if (err.response.status === 401) {
      const session = Session.get();
      if (!session) return Promise.reject(err);

      const newToken = await getRefreshToken(session.refresh_token);
      err.config.headers.Authorization = `Bearer ${newToken.access_token}`;
      // TODO: Set 'session' cookie

      return axios.request(err.config);
    }

    return Promise.reject(err);
  },
);
