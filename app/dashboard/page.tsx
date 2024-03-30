import { api } from '@/services/spotify';

export default async function Dashboard() {
  const { data } = await api('/me');
  return (
    <main>
      <h2>Dashboard</h2>
      {JSON.stringify(data)}
    </main>
  );
}
