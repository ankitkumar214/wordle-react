import { observer, useLocalObservable } from "mobx-react-lite";
import React, { useState, useEffect } from "react";
import WordScore from "./WordScore";
import Qwerty from "./Qwerty";
import Guess5 from "./guesses/Guess5";
import Guess6 from "./guesses/Guess6";
import Guess7 from "./guesses/Guess7";
import {ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default observer(function Display({ number }) {
  const score = useLocalObservable(() => WordScore);
  const [showModal, setShowModal] = useState(false);
  const [meaning, setMeaning] = useState("");

  const getWordMeaning = async (word) => {
    setMeaning("");
    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const data = await response.json();
      const m1 =
        data[0]?.meanings[0]?.definitions[0]?.definition != undefined
          ? data[0]?.meanings[0]?.definitions[0]?.definition
          : "";
      const m2 =
        data[0]?.meanings[1]?.definitions[0]?.definition != undefined
          ? "\n OR \n" + data[0]?.meanings[1]?.definitions[0]?.definition
          : "";
      setMeaning(m1 + m2);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (score.wrong) {
      showCustomNotification();
    }
  }, [score.wrong]);

  useEffect(() => {
    if (score.lost || score.won5 || score.won6 || score.won7) {
      switch (number) {
        case 5:
          getWordMeaning(score.word5);
          break;
        case 6:
          getWordMeaning(score.word6);
          break;
        case 7:
          getWordMeaning(score.word7);
          break;
      }
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [score.lost, score.won5, score.won6, score.won7]);

  useEffect(() => {
    score.init();
    switch (number) {
      case 5:
        window.addEventListener("keyup", score.handleKeyup5);

        return () => {
          window.removeEventListener("keyup", score.handleKeyup5);
        };
      case 6:
        window.addEventListener("keyup", score.handleKeyup6);

        return () => {
          window.removeEventListener("keyup", score.handleKeyup6);
        };
      case 7:
        window.addEventListener("keyup", score.handleKeyup7);

        return () => {
          window.removeEventListener("keyup", score.handleKeyup7);
        };
    }
  }, []);

  const showCustomNotification = () => {
    toast("Invalid Word", {
      autoClose: 500,
      position: toast.POSITION.TOP_CENTER,
      hideProgressBar: true,
      pauseOnHover: false,
      draggable: false,
      closeButton: false,
      theme: "dark",
    });
  };

  switch (number) {
    case 5:
      return (
        <>
          <ToastContainer />
          <div className="mt-8">
            {score.guesses.map((_, i) => (
              <Guess5
                key={i}
                word={score.word5}
                guess={score.guesses[i]}
                isGuessed={i < score.currentGuess}
              />
            ))}
          </div>
          <Qwerty score={score} number={number} />
          {showModal ? (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-sm">
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-4xl text-black float-right leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                      <span className="bg-white text-black block outline-none focus:outline-none">
                        &times;
                      </span>
                    </button>
                    <div className="relative px-4 flex-auto">
                      <p className="my-4 text-black text-xl leading-relaxed whitespace-pre-wrap">
                        {score.won5
                          ? "You Won 🎉\nPoints Scored: " +
                            score.scoreVal +
                            "\nCorrect Word: " +
                            score.word5 +
                            "\nMeaning: " +
                            meaning
                          : "You Lost 😐" +
                            "\nCorrect Word: " +
                            score.word5 +
                            "\nMeaning: " +
                            meaning}
                      </p>
                    </div>
                    <div className="flex items-center justify-center p-6">
                      <button
                        className="transition duration-0 bg-emerald-500 hover:bg-yellow-300 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-yellow-400 active:bg-gray-800 active:border-black rounded"
                        type="button"
                        onClick={() => score.init()}
                      >
                        New Game
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
    case 6:
      return (
        <>
          <ToastContainer />
          <div className="mt-8">
            {score.guesses.map((_, i) => (
              <Guess6
                key={i}
                word={score.word6}
                guess={score.guesses[i]}
                isGuessed={i < score.currentGuess}
              />
            ))}
          </div>
          <Qwerty score={score} number={number} />
          {showModal ? (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-sm">
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                      <span className="bg-white text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                    <div className="relative px-4 flex-auto">
                      <p className="my-4 text-black text-lg leading-relaxed whitespace-pre-wrap">
                        {score.won6
                          ? "You Won 🎉\nPoints Scored: " +
                            score.scoreVal +
                            "\nCorrect Word: " +
                            score.word6 +
                            "\nMeaning: " +
                            meaning
                          : "You Lost 😐" +
                            "\nCorrect Word: " +
                            score.word6 +
                            "\nMeaning: " +
                            meaning}
                      </p>
                    </div>
                    <div className="flex items-center justify-center p-6">
                      <button
                        className="transition duration-0 bg-emerald-500 hover:bg-yellow-300 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-yellow-400 active:bg-gray-800 active:border-black rounded"
                        type="button"
                        onClick={() => score.init()}
                      >
                        New Game
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
    case 7:
      return (
        <>
          <ToastContainer />
          <div className="mt-8">
            {score.guesses.map((_, i) => (
              <Guess7
                key={i}
                word={score.word7}
                guess={score.guesses[i]}
                isGuessed={i < score.currentGuess}
              />
            ))}
          </div>
          <Qwerty score={score} number={number} />
          {showModal ? (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-sm">
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                      <span className="bg-white text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                    <div className="relative px-4 flex-auto">
                      <p className="my-4 text-black text-lg leading-relaxed whitespace-pre-wrap">
                        {score.won7
                          ? "You Won 🎉\nPoints Scored: " +
                            score.scoreVal +
                            "\nCorrect Word: " +
                            score.word7 +
                            "\nMeaning: " +
                            meaning
                          : "You Lost 😐" +
                            "\nCorrect Word: " +
                            score.word7 +
                            "\nMeaning: " +
                            meaning}
                      </p>
                    </div>
                    <div className="flex items-center justify-center p-6">
                      <button
                        className="transition duration-0 bg-emerald-500 hover:bg-yellow-300 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-yellow-400 active:bg-gray-800 active:border-black rounded"
                        type="button"
                        onClick={() => score.init()}
                      >
                        New Game
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
});
