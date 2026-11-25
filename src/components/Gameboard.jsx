import Row from "./Row";

export default function GameBoard({
    currentGuess,
    pastGuesses,
    solutionWord
}) {
    const rows = [];

    for (let i = 0; i < 6; i++) {
        let guess = "";
        let submitted = false;

        if (pastGuesses[i]) {
            guess = pastGuesses[i];
            submitted = true;
        } else if (i === pastGuesses.length) {
            guess = currentGuess;
        }

        rows.push(
            <Row
                key={i}
                guess={guess}
                solutionWord={solutionWord}
                submitted={submitted}
            />
        );
    }

    return <div className="game-board">{rows}</div>;
}