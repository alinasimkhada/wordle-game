const keyboardRows = [
    "QWERTYUIOP",
    "ASDFGHJKL",
    "ZXCVBNM"
];

export default function Keyboard({
    onKeyPress,
    letterStatuses
}) {
    return (
        <div className="keyboard">
            {keyboardRows.map((row, index) => (
                <div className="keyboard-row" key={index}>
                    {index === 2 && (
                        <button
                            className="key special-key"
                            onClick={() => onKeyPress("ENTER")}
                        >
                            ENTER
                        </button>
                    )}

                    {row.split("").map(letter => (
                        <button
                            key={letter}
                            className={`key ${letterStatuses[letter] || ""}`}
                            onClick={() => onKeyPress(letter)}
                        >
                            {letter}
                        </button>
                    ))}

                    {index === 2 && (
                        <button
                            className="key special-key"
                            onClick={() => onKeyPress("BACKSPACE")}
                        >
                             &#9003;
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
}