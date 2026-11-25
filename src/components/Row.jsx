import Tile from "./Tile";

export default function Row({ guess, solutionWord, submitted }) {
    const letters = Array.from({ length: 5 }, (_, index) =>
        guess[index] || ""
    );

    function getTileStatus(index) {
        if (!submitted) return "";

        const letter = guess[index];

        if (letter === solutionWord[index]) {
            return "correct";
        }

        if (solutionWord.includes(letter)) {
            const correctCount = [...guess].filter(
                (char, i) =>
                    char === letter && solutionWord[i] === letter
            ).length;

            const solutionCount = [...solutionWord].filter(
                char => char === letter
            ).length;

            const previousCount = [...guess.slice(0, index)].filter(
                char => char === letter
            ).length;

            if (previousCount < solutionCount - correctCount) {
                return "present";
            }
        }

        return "absent";
    }

    return (
        <div className="row">
            {letters.map((letter, index) => (
                <Tile
                    key={index}
                    letter={letter}
                    status={getTileStatus(index)}
                />
            ))}
        </div>
    );
}