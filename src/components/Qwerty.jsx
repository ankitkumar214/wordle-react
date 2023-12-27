import { observer } from "mobx-react-lite";

export default observer(function Qwerty({ score, number }) {
  const qwerty = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];
  return (
    <div className="mt-8 mb-8">
      {qwerty.map((row) => (
        <div className="flex justify-center my-1">
          {row.split("").map((key) => {
            let bgColor;
            switch (number) {
              case 5:
                bgColor = score.exactGuesses5.includes(key)
                  ? "bg-green-600"
                  : score.inexactGuesses5.includes(key)
                  ? "bg-yellow-400"
                  : score.allGuesses.includes(key)
                  ? "bg-gray-800"
                  : "bg-gray-400";
                break;
              case 6:
                bgColor = score.exactGuesses6.includes(key)
                  ? "bg-green-600"
                  : score.inexactGuesses6.includes(key)
                  ? "bg-yellow-400"
                  : score.allGuesses.includes(key)
                  ? "bg-gray-800"
                  : "bg-gray-400";
                break;
              case 7:
                bgColor = score.exactGuesses7.includes(key)
                  ? "bg-green-600"
                  : score.inexactGuesses7.includes(key)
                  ? "bg-yellow-400"
                  : score.allGuesses.includes(key)
                  ? "bg-gray-800"
                  : "bg-gray-400";
                break;
            }

            const txtColor = score.allGuesses.includes(key)
            ? "text-white"
            : "text-black"

            return (
              <div
                className={`w-14 h-14 ${bgColor} ${txtColor} flex rounded-md font-bold items-center text-xl justify-center mx-1 uppercase`}
              >
                {key}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
});
