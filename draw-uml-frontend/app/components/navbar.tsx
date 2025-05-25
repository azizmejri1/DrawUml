"use client";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import SignUpModal from "./SignUpModal";
import { useRouter } from "next/navigation";
import axios from "axios";
import SignInModal from "./signin-modal";
import Link from "next/link";

export default function NavBar({
  isLoggedIn,
  setIsLoggedIn,
}: {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}) {
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const router = useRouter();

  const openSignInModal = () => {
    setIsSignUpModalOpen(false);
    setIsSignInModalOpen(true);
  };

  const openSignUpModal = () => {
    setIsSignInModalOpen(false);
    setIsSignUpModalOpen(true);
  };

  const closeModals = () => {
    setIsSignInModalOpen(false);
    setIsSignUpModalOpen(false);
  };

  const handleProfileClick = () => {
    router.push("/profile");
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:8080/auth/logout",
        {},
        { withCredentials: true }
      );
      setIsLoggedIn(false);
      router.push("/");
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };

  return (
    <>
      <div className="flex flex-row justify-between items-center h-[75px]">
        <Link href="/">
          <img src="/logo.png" className="m-2 p-2 h-[65px]" />
        </Link>
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <button
                onClick={handleProfileClick}
                className="text-black m-2 p-0 pr-4 pl-4 h-[45px] w-[100px] border-2 border-[#989898] border-solid rounded-xl font-medium hover:bg-black hover:text-white hover:border-black flex items-center justify-center"
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
              <button
                onClick={handleLogout}
                className="text-black m-2 p-0 pr-4 pl-4 h-[45px] w-[100px] border-2 border-[#989898] border-solid rounded-xl font-medium hover:bg-red-600 hover:text-white hover:border-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={openSignInModal}
              className="text-black m-2 p-0 pr-4 pl-4 h-[45px] w-[100px] border-2 border-[#989898] border-solid rounded-xl font-medium hover:bg-black hover:text-white hover:border-black"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
      <SignInModal
        isOpen={isSignInModalOpen}
        onClose={closeModals}
        onOpenSignUp={openSignUpModal}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />
      <SignUpModal
        isOpen={isSignUpModalOpen}
        onClose={closeModals}
        onOpenSignIn={openSignInModal}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />
    </>
  );
}
