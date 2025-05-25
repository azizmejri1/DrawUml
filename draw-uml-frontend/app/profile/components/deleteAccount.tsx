"use client";
import axios from "axios";
import { useState } from "react";

export default function DeleteAccount({ userId }: { userId: number | null }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!userId) return;
    if (
      !confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    )
      return;

    try {
      setIsDeleting(true);
      await axios.delete(`http://localhost:8080/user/${userId}`, {
        withCredentials: true,
      });
      alert("Account deleted successfully!");
      window.location.href = "/login";
    } catch (err) {
      console.error("Error deleting account:", err);
      alert("Failed to delete account.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-red-100 dark:border-red-900/50">
      <div className="flex items-start">
        <div className="flex-shrink-0 pt-0.5">
          <svg
            className="h-6 w-6 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <div className="ml-3">
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-500 mb-2">
            Delete Account
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Once you delete your account, there is no going back. Please be
            certain.
          </p>
          <button
            onClick={handleDelete}
            disabled={!userId || isDeleting}
            className={`px-4 py-2 rounded-lg font-medium ${
              isDeleting
                ? "bg-red-400 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700"
            } text-white transition-colors duration-300 flex items-center`}
          >
            {isDeleting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Deleting...
              </>
            ) : (
              "Delete Account"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
