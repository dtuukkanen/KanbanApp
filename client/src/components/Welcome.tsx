import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Board from './Board'
import { Link } from 'react-router-dom'

const Welcome = () => {
  const [username, setUsername] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setErrorMsg('Not authenticated');
      return;
    }
    
    // Call the "me" endpoint to validate token and get user info.
    fetch('/api/auth/me', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Not authenticated");
        }
        return response.json();
      })
      .then(data => {
        setUsername(data.email);
      })
      .catch(err => {
        console.error(err);
        setErrorMsg('Not authenticated');
        localStorage.removeItem('token');
      });
  }, [navigate]);

  return (
    <div className="bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        {errorMsg ? (
          <>
            <p className="text-base/7 font-semibold text-red-600">{errorMsg}</p>
            <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
              User is not authenticated. Please <Link to="/login" className='text-indigo-600'>log in</Link>.
            </p>
          </>
        ) : (
          <>
            <p className="text-base/7 font-semibold text-indigo-600">
              Welcome, {username}
            </p>
            <h2 className="mt-2 text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
              Kanban Board
            </h2>
            <Board />
          </>
        )}
      </div>
    </div>
  )
}

export default Welcome
