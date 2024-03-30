import { NextRequest, NextResponse } from 'next/server';

import { Session } from '@/utils';

export function GET(req: NextRequest) {
  Session.set(null);

  return NextResponse.redirect(new URL('/', req.url));
}
