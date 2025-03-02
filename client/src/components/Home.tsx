import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Board from "./Board";
import { Link } from "react-router-dom";
import { BoardData } from "../types/types";

const Home = () => {
  const [username, setUsername] = useState<string>("");
  const [boards, setBoards] = useState<BoardData[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setErrorMsg("Not authenticated");
      return;
    }

    // First call "me" to get user info.
    fetch("/api/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Not authenticated");
        }
        return response.json();
      })
      .then((data) => {
        setUsername(data.username);
        // Now fetch aggregated board data.
        return fetch(`/api/boards`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch boards");
        }
        return response.json();
      })
      .then((data: { boards: BoardData[] }) => {
        setBoards(data.boards);
      })
      .catch((err) => {
        console.error(err);
        setErrorMsg(err.message);
      });
  }, [navigate]);

  return (
    <div className="bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        {/* User is not authenticated */}
        {errorMsg === "Not authenticated" ? (
          <>
            <p className="text-base font-semibold text-red-600">
              User is not authenticated.
            </p>
            <p className="mt-8 text-lg font-medium text-gray-500">
              Please{" "}
              <Link to="/login" className="text-indigo-600">
                log in
              </Link>
              .
            </p>
          </>
        ) : (
          // User is authenticated
          <>
            {errorMsg && (
              <p className="text-base font-semibold text-red-600">{errorMsg}</p>
            )}
            <p className="text-base font-semibold text-indigo-600">
              Welcome, {username}
            </p>
            <h2 className="mt-2 text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
              Kanban Board
            </h2>
            <div className="mt-8 flex justify-center space-x-4">
              {boards.map((board) => (
                <Board key={board._id} boardData={board} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
