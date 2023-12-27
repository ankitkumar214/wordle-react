import fiveLetterWords from "../assets/fiveLetterWords.json";
import sixLetterWords from "../assets/sixLetterWords.json";
import sevenLetterWords from "../assets/sevenLetterWords.json";

async function checkWord(word) {
  return fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then((response) => {
      if (response.status === 404) {
        return { error: true };
      } else {
        return response.json();
      }
    })
    .catch((error) => {
      console.error(error);
      return { error: true };
    });
}
let isCheckingWord = false;

export default {
  word5: "",
  word6: "",
  word7: "",
  score: 0,
  wrong: 0,
  guesses: [],
  currentGuess: 0,

  get won5() {
    return this.guesses[this.currentGuess - 1] === this.word5;
  },
  get won6() {
    return this.guesses[this.currentGuess - 1] === this.word6;
  },
  get won7() {
    return this.guesses[this.currentGuess - 1] === this.word7;
  },

  get lost() {
    return this.currentGuess === 6;
  },

  get allGuesses() {
    return this.guesses.slice(0, this.currentGuess).join("").split("");
  },

  get exactGuesses5() {
    return this.word5.split("").filter((letter, i) => {
      return this.guesses
        .slice(0, this.currentGuess)
        .map((word5) => word5[i])
        .includes(letter);
    });
  },

  get exactGuesses6() {
    return this.word6.split("").filter((letter, i) => {
      return this.guesses
        .slice(0, this.currentGuess)
        .map((word6) => word6[i])
        .includes(letter);
    });
  },

  get exactGuesses7() {
    return this.word7.split("").filter((letter, i) => {
      return this.guesses
        .slice(0, this.currentGuess)
        .map((word7) => word7[i])
        .includes(letter);
    });
  },

  get inexactGuesses5() {
    return this.word5
      .split("")
      .filter((letter) => this.allGuesses.includes(letter));
  },
  get inexactGuesses6() {
    return this.word6
      .split("")
      .filter((letter) => this.allGuesses.includes(letter));
  },
  get inexactGuesses7() {
    return this.word7
      .split("")
      .filter((letter) => this.allGuesses.includes(letter));
  },
  get scoreVal() {
    return this.score;
  },

  init() {
    this.word5 =
      fiveLetterWords[Math.round(Math.random() * fiveLetterWords.length)];
    this.word6 =
      sixLetterWords[Math.round(Math.random() * sixLetterWords.length)];
    this.word7 =
      sevenLetterWords[Math.round(Math.random() * sevenLetterWords.length)];
    this.guesses.replace(new Array(6).fill(""));
    this.currentGuess = 0;
    this.score = 0;
  },
  calcScore() {
    const len = this.guesses[this.currentGuess].length;
    const guess = this.guesses[this.currentGuess];
    switch (len) {
      case 5:
        let charMap5 = {};
        let wordMap5 = {};
        for (let i = 0; i < this.word5.length; i++) {
          const char = this.word5[i];
          wordMap5[char] = (wordMap5[char] || 0) + 1;
          charMap5[guess[i]] = 0;
          if (char === guess[i]) {
            charMap5[guess[i]]++;
          }
        }
        if (guess === this.word5) {
          this.score +=
            (6 - this.currentGuess) * (6 - this.currentGuess) * 5 * len;
        } else {
          let yellow = 0;
          let green = 0;
          guess.split("").map((key, i) => {
            charMap5[guess[i]]++;
            if (this.word5.includes(key) && this.word5[i] == key) {
              green += 1;
            } else if (
              this.word5.includes(key) &&
              this.word5[i] != key &&
              wordMap5[guess[i]] >= charMap5[guess[i]]
            ) {
              yellow += 1;
            }
          });
          this.score += (6 - this.currentGuess) * (yellow * 3 + green * 5);
        }
        break;
      case 6:
        let charMap6 = {};
        let wordMap6 = {};
        for (let i = 0; i < this.word6.length; i++) {
          const char = this.word6[i];
          wordMap6[char] = (wordMap6[char] || 0) + 1;
          charMap6[guess[i]] = 0;
          if (char === guess[i]) {
            charMap6[guess[i]]++;
          }
        }
        if (guess === this.word6) {
          this.score +=
            (6 - this.currentGuess) * (6 - this.currentGuess) * 5 * len;
        } else {
          let yellow = 0;
          let green = 0;
          guess.split("").map((key, i) => {
            charMap6[guess[i]]++;
            if (this.word6.includes(key) && this.word6[i] == key) {
              green += 1;
            } else if (
              this.word6.includes(key) &&
              this.word6[i] != key &&
              wordMap6[guess[i]] >= charMap6[guess[i]]
            ) {
              yellow += 1;
            }
          });
          this.score += (6 - this.currentGuess) * (yellow * 3 + green * 5);
        }
        break;
      case 7:
        let charMap7 = {};
        let wordMap7 = {};
        for (let i = 0; i < this.word7.length; i++) {
          const char = this.word7[i];
          wordMap7[char] = (wordMap7[char] || 0) + 1;
          charMap7[guess[i]] = 0;
          if (char === guess[i]) {
            charMap7[guess[i]]++;
          }
        }
        if (guess === this.word7) {
          this.score +=
            (6 - this.currentGuess) * (6 - this.currentGuess) * 5 * len;
        } else {
          let yellow = 0;
          let green = 0;
          guess.split("").map((key, i) => {
            charMap7[guess[i]]++;
            if (this.word7.includes(key) && this.word7[i] == key) {
              green += 1;
            } else if (
              this.word7.includes(key) &&
              this.word7[i] != key &&
              wordMap7[guess[i]] >= charMap7[guess[i]]
            ) {
              yellow += 1;
            }
          });
          this.score += (6 - this.currentGuess) * (yellow * 3 + green * 5);
        }
        break;
    }
  },
  submitGuess() {
      if (isCheckingWord) {
        return;
      }
      isCheckingWord = true;
    checkWord(this.guesses[this.currentGuess])
      .then((result) => {
        if (result.error) {
          this.wrong = 1;
        } else {
          this.calcScore();
          this.currentGuess += 1;
          this.wrong = 0;
        }
        isCheckingWord = false;
      })
      .catch((error) => {
        console.error(error);
        this.wordError = 1;
        isCheckingWord = false;
      });
  },

  handleKeyup5(e) {
    this.wrong = 0;
    if (this.won5 || this.lost) {
      return;
    }

    if (e.key === "Enter" && this.guesses[this.currentGuess].length === 5) {
      return this.submitGuess();
    }

    if (e.key === "Backspace") {
      this.guesses[this.currentGuess] = this.guesses[this.currentGuess].slice(
        0,
        this.guesses[this.currentGuess].length - 1
      );
      return;
    }

    if (this.guesses[this.currentGuess].length < 5 && e.key.match(/^[A-z]$/)) {
      this.guesses[this.currentGuess] =
        this.guesses[this.currentGuess] + e.key.toLowerCase();
    }
  },

  handleKeyup6(e) {
    this.wrong = 0;
    if (this.won6 || this.lost) {
      return;
    }

    if (e.key === "Enter" && this.guesses[this.currentGuess].length === 6) {
      return this.submitGuess();
    }

    if (e.key === "Backspace" ) {
      this.guesses[this.currentGuess] = this.guesses[this.currentGuess].slice(
        0,
        this.guesses[this.currentGuess].length - 1
      );
      return;
    }

    if (this.guesses[this.currentGuess].length < 6 && e.key.match(/^[A-z]$/)) {
      this.guesses[this.currentGuess] =
        this.guesses[this.currentGuess] + e.key.toLowerCase();
    }
  },

  handleKeyup7(e) {
    this.wrong = 0;
    if (this.won7 || this.lost) {
      return;
    }

    if (e.key === "Enter" && this.guesses[this.currentGuess].length === 7) {
      return this.submitGuess();
    }

    if (e.key === "Backspace") {
      this.guesses[this.currentGuess] = this.guesses[this.currentGuess].slice(
        0,
        this.guesses[this.currentGuess].length - 1
      );
      return;
    }

    if (this.guesses[this.currentGuess].length < 7 && e.key.match(/^[A-z]$/)) {
      this.guesses[this.currentGuess] =
        this.guesses[this.currentGuess] + e.key.toLowerCase();
    }
  },
};
