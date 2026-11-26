import { useState, useEffect } from "react";
import GameBoard from "./components/GameBoard.jsx";
import Keyboard from "./components/KeyBoard";
import "./App.css";

const WORDS = [
    "APPLE",
    "BREAD",
    "CHAIR",
    "DREAM",
    "EARTH",
    "GRAPE",
    "HOUSE",
    "MUSIC",
    "PLANT",
    "SMILE",
    "TRAIN",
    "WATER"
];

const SOLUTION_WORD = "APPLE";

export default function App() {
    const [solutionWord] = useState(SOLUTION_WORD);
    const [currentGuess, setCurrentGuess] = useState("");
    const [pastGuesses, setPastGuesses] = useState([]);
    const [gameStatus, setGameStatus] = useState("IN_PROGRESS");
    const [message, setMessage] = useState("");
    const [letterStatuses, setLetterStatuses] = useState({});

    function handleKeyPress(key) {
        if (gameStatus !== "IN_PROGRESS") return;

        if (key === "ENTER") {
            submitGuess();
            return;
        }

        if (key === "BACKSPACE") {
            setCurrentGuess(previous => previous.slice(0, -1));
            return;
        }

        if (/^[A-Z]$/.test(key) && currentGuess.length < 5) {
            setCurrentGuess(previous => previous + key);
        }
    }

    function submitGuess() {
        if (currentGuess.length !== 5) {
            setMessage("Enter a 5-letter word!");
            return;
        }

        if (!WORDS.includes(currentGuess)) {
            setMessage("Word not in word list!");
            return;
        }

        const updatedGuesses = [...pastGuesses, currentGuess];

        setPastGuesses(updatedGuesses);
        setCurrentGuess("");
        setMessage("");

        updateKeyboardStatuses(currentGuess);

        if (currentGuess === solutionWord) {
            setGameStatus("WON");
            return;
        }

        if (updatedGuesses.length === 6) {
            setGameStatus("LOST");
        }
    }

    function updateKeyboardStatuses(guess) {
        const updatedStatuses = { ...letterStatuses };

        guess.split("").forEach((letter, index) => {
            let status = "absent";

            if (letter === solutionWord[index]) {
                status = "correct";
            } else if (solutionWord.includes(letter)) {
                status = "present";
            }

            const priority = {
                absent: 1,
                present: 2,
                correct: 3
            };

            if (
                !updatedStatuses[letter] ||
                priority[status] > priority[updatedStatuses[letter]]
            ) {
                updatedStatuses[letter] = status;
            }
        });

        setLetterStatuses(updatedStatuses);
    }

    useEffect(() => {
        function handlePhysicalKeyboard(event) {
            if (event.key === "Enter") {
                handleKeyPress("ENTER");
            } else if (event.key === "Backspace") {
                handleKeyPress("BACKSPACE");
            } else if (/^[a-zA-Z]$/.test(event.key)) {
                handleKeyPress(event.key.toUpperCase());
            }
        }

        window.addEventListener("keydown", handlePhysicalKeyboard);

        return () => {
            window.removeEventListener(
                "keydown",
                handlePhysicalKeyboard
            );
        };
    });

    function restartGame() {
        setCurrentGuess("");
        setPastGuesses([]);
        setGameStatus("IN_PROGRESS");
        setMessage("");
        setLetterStatuses({});
    }

    return (
        <div className="app">
            <header className="header">
                <h1>WORDLE</h1>
                <p>Guess the hidden five-letter word!</p>
            </header>

            <main>
                <GameBoard
                    currentGuess={currentGuess}
                    pastGuesses={pastGuesses}
                    solutionWord={solutionWord}
                />

                <p className="message">{message}</p>

                <Keyboard
                    onKeyPress={handleKeyPress}
                    letterStatuses={letterStatuses}
                />
            </main>

            {gameStatus !== "IN_PROGRESS" && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>
                            {gameStatus === "WON"
                                ? "Congratulations! 🎉"
                                : "Game Over!"}
                        </h2>

                        <p>
                            {gameStatus === "WON"
                                ? "You guessed the correct word!"
                                : "Better luck next time!"}
                        </p>

                        <p>
                            The correct word was: <strong>{solutionWord}</strong>
                        </p>

                        <button onClick={restartGame}>
                            Play Again
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}