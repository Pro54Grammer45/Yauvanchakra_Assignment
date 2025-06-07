import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export default function Page() {
  const cookieStore = cookies();
  const isAuthenticated = cookieStore.get('adminInfo');
  console.log('isAuthenticated :'+isAuthenticated);
  
  if (isAuthenticated) {
    // If the 'adminInfo' cookie exists, redirect to the dashboard
    console.log('isAuthenticated :' + isAuthenticated);
    redirect('/dashboard');
  } else {
    // Otherwise, redirect to the login page
    redirect('/login');
  }
}
