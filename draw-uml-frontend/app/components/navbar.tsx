"use client";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import SignInModal from "./signin-modal";
import { useRouter } from "next/navigation";

export default function NavBar({
  isLoggedIn,
  setIsLoggedIn,
}: {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleProfileClick = () => {
    router.push("/profile");
  };

  return (
    <>
      <div className="flex flex-row justify-between items-center h-[75px]">
        <img src="/logo.png" className="m-2 p-2 h-[65px]" />
        {isLoggedIn ? (
          <button
            onClick={handleProfileClick}
            className="w-xl text-black m-2 p-0 pr-4 pl-4 h-[45px] w-[100px] border-2 border-[#989898] border-solid rounded-xl font-medium hover:bg-black hover:text-white hover:border-black flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            Profile
          </button>
        ) : (
          <button
            onClick={toggleModal}
            className="w-xl text-black m-2 p-0 pr-4 pl-4 h-[45px] w-[100px] border-2 border-[#989898] border-solid rounded-xl font-medium hover:bg-black hover:text-white hover:border-black"
          >
            Sign in
          </button>
        )}
      </div>
      <SignInModal
        isOpen={isModalOpen}
        onClose={toggleModal}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />
    </>
  );
}
