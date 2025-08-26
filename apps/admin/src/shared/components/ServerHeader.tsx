import { cookies } from 'next/headers';
import { HeaderClient } from './HeaderClient';

export default function ServerHeader(): React.ReactElement {
  const cookieStore = cookies();
  const authCookie = cookieStore.get('access');
  const isAuthenticated = !!authCookie?.value;

  console.log('AdminServerHeader - authCookie:', authCookie);
  console.log('AdminServerHeader - isAuthenticated:', isAuthenticated);

  return <HeaderClient isAuthenticated={isAuthenticated} />;
}
