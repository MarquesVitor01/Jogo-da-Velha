import React, { useRef, useState } from "react";
import "../styles/game.css";

let data = ["", "", "", "", "", "", "", "", ""];

export const Velha = () => {
    let [count, setCount] = useState(0);
    let [lock, setLock] = useState(false);
    let titleRef = useRef(null);

    const toggle = (e, num) => {
        if (lock || data[num]) {
            return;
        }
        if (count % 2 === 0) {
            e.target.innerHTML = `<img src="../../../images/x.png" alt="X">`;
            data[num] = "x";
        } else {
            e.target.innerHTML = `<img src="../../../images/circulo.png" alt="O">`;
            data[num] = "o";
        }
        setCount(count + 1);
        checkWin();
    };

    const checkWin = () => {
        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (data[a] && data[a] === data[b] && data[a] === data[c]) {
                won(data[a]);
                return;
            }
        }

        if (!data.includes("")) {
            draw();
        }
    };

    const won = (winner) => {
        setLock(true);
        if (titleRef.current) {
            titleRef.current.innerHTML = `Parabéns: <img src="../../../images/${winner === "x" ? "x" : "circulo"}.png" alt="${winner}"> você ganhou!`;
        }
    };

    const draw = () => {
        setLock(true);
        if (titleRef.current) {
            titleRef.current.innerHTML = `Empate: <img src="../../../images/velha.png" alt="Empate">`;
        }
    };

    const reset = () => {
        setLock(false);
        data = ["", "", "", "", "", "", "", "", ""];
        if (titleRef.current) {
            titleRef.current.innerHTML = "Jogo da Velha";
        }
        for (let i = 0; i < 9; i++) {
            const box = document.getElementById(`box${i + 1}`);
            if (box) {
                box.innerHTML = "";
            }
        }
        setCount(0);
    };

    return (
        <div className="container-fluid text-center">
            <h1 className="title" ref={titleRef}>Jogo da Velha</h1>
            <div className="board align-items-center justify-content-center d-flex flex-column">
                {[0, 1, 2].map((row) => (
                    <div className="row" key={row}>
                        {[0, 1, 2].map((col) => {
                            const index = row * 3 + col;
                            return (
                                <div
                                    className="boxes"
                                    id={`box${index + 1}`}
                                    key={index}
                                    onClick={(e) => toggle(e, index)}
                                ></div>
                            );
                        })}
                    </div>
                ))}
            </div>
            <button className="btn reset" onClick={reset}>Recomeçar</button>
        </div>
    );
};