"use client";
import axios from "axios";
import { useState } from "react";

export default function ProfileUpdate({
  userInfo,
  setUserInfo,
}: {
  userInfo: User | null;
  setUserInfo: React.Dispatch<React.SetStateAction<User | null>>;
}) {
  const [formData, setFormData] = useState({
    firstName: userInfo?.firstName || "",
    lastName: userInfo?.lastName || "",
    email: userInfo?.email || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8080/user/${userInfo?.id}`,
        formData,
        { withCredentials: true }
      );
      setUserInfo(response.data);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile.");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Update Profile
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-all"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-all"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-all"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 transform hover:scale-[1.01] shadow-md"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
}
