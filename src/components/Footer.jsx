import React, { useState } from "react";

export default function Footer() {
  const [show, setShow] = useState(false);
  return (
    <>
      <footer className="bg-gray-800 w-full">
        <div className="mx-auto p-4 flex justify-between">
          <a href={"/"} className="flex flex-row items-center">
            <img
              src="https://abhicodes737.github.io/reactjs-wordle/assets/logo-b4e51f3f.png"
              className="h-10 self-center mr-4"
              alt="Logo"
            />
            <span className="self-center text-3xl font-semibold whitespace-nowrap text-gray-300">
              Wordle - Unlimited
            </span>
          </a>
          <ul className="flex flex-wrap items-center text-xl font-medium text-gray-500 dark:text-gray-400">
            <li>
              <div
                onClick={() => setShow(true)}
                className="mr-6 hover:underline hover:cursor-pointer"
              >
                About
              </div>
            </li>
          </ul>
        </div>
      </footer>
      {show ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-sm">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => setShow(false)}
                >
                  <span className="bg-white text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                  </span>
                </button>
                <div className="relative px-4 flex-auto">
                  <p className="my-4 text-black text-xl leading-relaxed whitespace-pre-wrap">
                    Hey, welcome to <b>Wordle - Unlimited</b>, the best word
                    game ever. Play as many games you want and try to reach the
                    highest amount of points possible. This website is made by
                    Ankit Kumar as a personal project with the help of React,
                    Tailwind CSS and the Free Dictionary API.
                  </p>
                </div>
                <div className="flex items-center justify-center p-6">
                  <button
                    className="transition duration-0 bg-emerald-500 hover:bg-yellow-300 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-yellow-400 active:bg-gray-800 active:border-black rounded"
                    type="button"
                    onClick={() => setShow(false)}
                  >
                    Let's Play!
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
