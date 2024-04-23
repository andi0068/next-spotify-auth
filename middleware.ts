import { NextResponse, type NextRequest } from 'next/server';

import { getRefreshToken } from '@/services/auth';
import { Session } from '@/utils';

export async function middleware(req: NextRequest) {
  const session = Session.get(req);

  if (session) {
    const newToken = await getRefreshToken(session.refresh_token);
    const res = NextResponse.next();
    Session.set({ ...session, access_token: newToken.access_token }, res);
    return res;
  }
}
