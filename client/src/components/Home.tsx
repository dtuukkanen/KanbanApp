import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Board from './Board'
import { Link } from 'react-router-dom'
import { BoardData } from '../types/types'

const Home = () => {
  const [username, setUsername] = useState<string>('');
  const [boards, setBoards] = useState<BoardData[]>([]);
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
        setUsername(data.username);
        // Now fetch aggregated board data.
        return fetch(`/api/boards`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      })
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch boards");
        }
        return response.json();
      })
      .then((data: {boards: BoardData[]}) => {
        // Assume the aggregation returns an object with a "boards" array.
        setBoards(data.boards);
      })
      .catch(err => {
        console.error(err);
        setErrorMsg('Not authenticated');
        //localStorage.removeItem('token');
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
            <div className='mt-8 flex justify-center space-x-4'>
              {boards.map((board) => (
                <Board key={board._id} boardData={board} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Home
