import { useRef, useEffect, useState, FC } from "react";
import { InitProps } from "../types/timerProps";

const Timer: FC<InitProps> = ({ initial }) => {
  const [num, setNum] = useState(Number(initial));
  const [pause, setPause] = useState(false);

  let intervalRef = useRef<any>();

  const decreaseNum = () => {
    setNum((prev) => {
      if (prev <= 0) {
        clearInterval(intervalRef.current);
        return 0;
      } else {
        return prev - 1;
      }
    });
  };

  useEffect(() => {
    intervalRef.current = setInterval(decreaseNum, 1000);

    return () => clearInterval(intervalRef.current);
  }, []);

  const handleClick = () => {
    if (!pause) {
      clearInterval(intervalRef.current);
    } else {
      intervalRef.current = setInterval(decreaseNum, 1000);
    }
    setPause((prev) => !prev);
  };

  return (
    <div>
      <div data-testid="timer-value">{num}</div>
      <button data-testid="stop-button" onClick={handleClick}>
        {pause ? "Run" : "Pause"}
      </button>
    </div>
  );
};

export default Timer;
