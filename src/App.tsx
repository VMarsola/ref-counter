import { FC } from "react";
import Timer from "./components/Timer";
import { InitProps } from "./types/timerProps";

const App: FC<InitProps> = ({ initial }) => {
  return (
    <>
      <Timer initial={initial} />
    </>
  );
};

export default App;
