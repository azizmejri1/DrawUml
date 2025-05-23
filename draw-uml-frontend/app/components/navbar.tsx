"use client";
import Image from "next/image";
import { useState } from "react";
import SignInModal from "./signin-modal";

export default function NavBar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <div className="flex flex-row justify-between items-center h-[75px]">
        <img src="/logo.png" className="m-2 p-2 h-[65px]" />
        <button
          onClick={toggleModal}
          className="w-xl text-black m-2 p-0 pr-4 pl-4 h-[45px] w-[100px] border-2 border-[#989898] border-solid rounded-xl font-medium hover:bg-black hover:text-white hover:border-black"
        >
          Sign in
        </button>
      </div>
      <SignInModal isOpen={isModalOpen} onClose={toggleModal} />
    </>
  );
}
