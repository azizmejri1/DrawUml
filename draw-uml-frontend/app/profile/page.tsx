"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import ProfileUpdate from "./components/profileUpdate";
import History from "./components/history";
import DeleteAccount from "./components/deleteAccount";

export default function Profile() {
  const [id, setId] = useState<number | null>(null);
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const login = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("http://localhost:8080/auth/profile", {
          withCredentials: true,
        });

        const { sub, username } = response.data;
        setId(sub);

        const response1 = await axios.get(
          `http://localhost:8080/user/profile/${sub}`,
          { withCredentials: true }
        );
        setUserInfo(response1.data);
      } catch (err: any) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    login();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Loading profile...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
            User Profile
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500 dark:text-gray-400">
            Manage your account settings and view your activity history
          </p>
        </div>

        {userInfo ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* User Info Card */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 lg:col-span-1">
              <div className="flex flex-col items-center mb-6">
                <div className="relative mb-4">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold">
                    {userInfo.firstName.charAt(0)}
                    {userInfo.lastName.charAt(0)}
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  {userInfo.firstName} {userInfo.lastName}
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  @{userInfo.username}
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Account Details
                  </h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-300">
                        First Name
                      </span>
                      <span className="text-gray-900 dark:text-white font-medium">
                        {userInfo.firstName}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-300">
                        Last Name
                      </span>
                      <span className="text-gray-900 dark:text-white font-medium">
                        {userInfo.lastName}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-300">
                        Email
                      </span>
                      <span className="text-gray-900 dark:text-white font-medium">
                        {userInfo.email}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-2 space-y-8">
              <ProfileUpdate userInfo={userInfo} setUserInfo={setUserInfo} />
              <History userId={id} />
              <DeleteAccount userId={id} />
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">
              No user information available
            </h3>
            <p className="mt-1 text-gray-500 dark:text-gray-400">
              We couldn't load your profile information. Please try again later.
            </p>
            <div className="mt-6">
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Refresh
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
