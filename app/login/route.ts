import { NextRequest, NextResponse } from 'next/server';

import { getAuthorizeUrl, getAccessToken } from '@/services/auth';
import { Session } from '@/utils';

export async function GET(req: NextRequest) {
  const session = Session.get();
  if (session) return NextResponse.redirect(new URL('/dashboard', req.url));

  const code = req.nextUrl.searchParams.get('code');
  if (!code) return NextResponse.redirect(getAuthorizeUrl());

  const token = await getAccessToken(code);
  Session.set(token);

  return NextResponse.redirect(new URL('/dashboard', req.url));
}
