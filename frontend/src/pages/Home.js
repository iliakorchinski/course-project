import { useEffect } from 'react';
import { useNavigate } from 'react-router';

export default function HomePage() {
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const responce = await fetch('http://localhost:3001/auth/home', {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        if (responce.status !== 201) {
          navigate('/login');
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, [navigate]);
  return <h1>This is homePage</h1>;
}
