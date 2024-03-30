import { redirect } from 'next/navigation';

import { Session } from '@/utils';

export default function Layout({ children }: { children: React.ReactNode }) {
  if (!Session.get()) redirect('/login');
  return (
    <>
      <header>
        <h1>Spotify</h1>
        <div>
          <a href="/logout">Logout</a>
        </div>
        {JSON.stringify(Session.get())}
      </header>
      {children}
    </>
  );
}
