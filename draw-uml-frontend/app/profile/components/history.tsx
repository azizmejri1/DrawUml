import axios from "axios";
import { useEffect, useState } from "react";

export default function History({ userId }: { userId: number | null }) {
  const [history, setHistory] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!userId) return;
      try {
        setIsLoading(true);
        const response = await axios.get(
          `http://localhost:8080/user/history/${userId}`,
          { withCredentials: true }
        );
        setHistory(response.data);
      } catch (err) {
        console.error("Error fetching history:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHistory();
  }, [userId]);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Activity History
      </h2>
      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : history.length > 0 ? (
        <div className="space-y-3">
          {history.map((item, index) => (
            <div
              key={index}
              className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
            >
              <p className="text-gray-800 dark:text-gray-200">{item}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {new Date().toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
            No history
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Your activity history will appear here.
          </p>
        </div>
      )}
    </div>
  );
}
