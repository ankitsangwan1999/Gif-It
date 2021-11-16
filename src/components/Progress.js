import { useState, useEffect } from "react";

const Progress = ({ messages }) => {
    const clocks = ["🕛", "🕒", "🕕", "🕘"];
    const [clock, setClock] = useState("🕛");
    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setClock(`${clocks[i]}`);
            ++i;
            if (i === 4) i = 0;
        }, 200);
        return () => {
            clearInterval(interval);
            console.log("Log: Interval Cleared");
        };
    }, []);

    return (
        <div className="Progress">
            {messages.map((message, index) =>
                index === messages.length - 1 ? (
                    <p key={index}>
                        <span>{clock}</span> {message}
                    </p>
                ) : (
                    <p key={index}>&#x2705; {message}</p>
                )
            )}
        </div>
    );
};

export default Progress;
