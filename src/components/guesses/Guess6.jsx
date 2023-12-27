import React from "react";

export default function Guess6({ isGuessed, guess, word }) {
  let charMap = {};
  let wordMap = {};
  for (let i = 0; i < word.length; i++) {
    const char = word[i];
    wordMap[char] = (wordMap[char] || 0) + 1;
    charMap[guess[i]] = 0;
    if (word[i] === guess[i]) {
      charMap[guess[i]]++;
    }
  }
  return (
    <div className="grid grid-cols-6 gap-2 mb-2">
      {new Array(6).fill(0).map((_, i) => {
        charMap[guess[i]]++;
        const bgColor = !isGuessed
          ? "bg-gray-200"
          : guess[i] === word[i]
          ? "bg-green-600"
          : word.includes(guess[i]) && wordMap[guess[i]] >= charMap[guess[i]]
          ? "bg-yellow-400"
          : "bg-gray-800";

          const txtColor = !isGuessed
          ? "text-black"
          : "text-white";

        return (
          <div
            className={`h-16 w-16 border border-black font-bold text-2xl ${txtColor} uppercase flex items-center justify-center ${bgColor}`}
          >
            {guess[i]}
          </div>
        );
      })}
    </div>
  );
}
