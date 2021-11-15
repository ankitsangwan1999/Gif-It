const Progress = ({ messages }) => {
    return (
        <div className="Progress">
            {messages.map((message, index) =>
                index === messages.length - 1 ? (
                    <p key={index}>&#x23F2; {message}</p>
                ) : (
                    <p key={index}>&#x2705; {message}</p>
                )
            )}
        </div>
    );
};

export default Progress;
