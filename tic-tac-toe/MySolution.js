import { useEffect, useMemo, useState } from "react"

export const TicTacToe = () => {
    return <Game size={4} />
}


const Game = (props) => {
    const initialBoard = useMemo(() => new Array(props.size * props.size).fill(undefined), []);
    const [board, setBoard] = useState([...initialBoard])
    const gridCss = useMemo(() => new Array(props.size).fill("200px").join(" "), []);
    const [currentPlayer, setCurrentPlayer] = useState("X");
    const [winner, setWinner] = useState();

    const winningValues = useMemo(() => {
        const values = [];
        for (let i = 0; i < props.size; i++) {
            const horizontal = [];
            const vertical = [];
            for (let j = 0; j < props.size; j++) {
                horizontal.push(i * props.size + j);
                vertical.push(i + props.size * j);
            }
            values.push(horizontal);
            values.push(vertical);
        }

        const diagonal1 = [];
        const diagonal2 = [];

        for (let i = 0; i < props.size; i++) {
            diagonal1.push((props.size + 1) * i);
            diagonal2.push((props.size - 1) * (i + 1));
        }
        values.push(diagonal1);
        values.push(diagonal2);
        console.log(values);
        return values;
    }, []);

    useEffect(() => {
        const isXWinner = winningValues.some((i) => i.every(el => board[el] === "X"));
        if (isXWinner) {
            setWinner("X")
        }
        const isOWinner = winningValues.some((i) => i.every(el => board[el] === "O"));
        if (isOWinner) {
            setWinner("O")
        }
    }, [board]);

    return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: '100vh' }}>
        <div>
            <button onClick={() => {
                setCurrentPlayer("X");
                setBoard([...initialBoard])
                setWinner(undefined);
            }}>Reset</button>
            {winner === undefined && <h2>{`Turn: ${currentPlayer}`}</h2>}
            <div style={{ display: "grid", gridTemplateColumns: `${gridCss}`, height: "400px" }}>
                {board.map((el, index) => <button onClick={() => {
                    const value = [...board];
                    value[index] = currentPlayer;
                    setBoard(value);
                    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
                }} disabled={board[index] !== undefined || winner !== undefined} key={index}><h2>{el}</h2></button>)}
            </div>
            {winner && <h2>{`Winner ${winner}`}</h2>}
        </div>
    </div>
}