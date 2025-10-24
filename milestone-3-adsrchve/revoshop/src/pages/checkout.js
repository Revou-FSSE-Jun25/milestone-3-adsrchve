import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { isLoggedIn } from '../utils/auth';

export default function CheckoutPage() {
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn()) router.push('/login');
  }, []);

  return <div>Checkout Page</div>;
}
