import { useKeyboardControls } from "@react-three/drei";
import { useEffect, useRef } from "react";
import useGame from "./stores/useGame.js";
import { addEffect } from "@react-three/fiber";

export default function Interface() {
  //   const controls = useKeyboardControls((state) => {
  //     return state;
  //   });

  const forward = useKeyboardControls((state) => state.forward);
  const backward = useKeyboardControls((state) => state.backward);
  const leftward = useKeyboardControls((state) => state.leftward);
  const rightward = useKeyboardControls((state) => state.rightward);
  const jump = useKeyboardControls((state) => state.jump);

  const restart = useGame((state) => state.restart);
  const phase = useGame((state) => state.phase);

  const time = useRef();

  useEffect(() => {
    const unsubscribeEffect = addEffect(() => {
      const state = useGame.getState();

      let elapsedTime = 0;

      if (state.phase === "playing") {
        elapsedTime = Date.now() - state.startTime;
      } else if (state.phase === "ended") {
        elapsedTime = state.endTime - state.startTime;
      }

      elapsedTime /= 1000;

      elapsedTime = elapsedTime.toFixed(2);

      if (time.current) {
        time.current.textContent = elapsedTime;
      }
    });

    return () => {
      unsubscribeEffect();
    };
  }, []);

  return (
    <div className="interface">
      {/* Time */}
      <div ref={time} className="time">
        0.00
      </div>

      {/* Restart */}
      {phase === "ended" && (
        <div className="restart" onClick={restart}>
          Restart
        </div>
      )}

      {/* Controls */}
      <div className="controls">
        <div className="raw">
          <div className={`key ${forward ? "active" : ""}`}>W &uarr;</div>
        </div>
        <div className="raw">
          <div className={`key ${leftward ? "active" : ""}`}>A &larr;</div>
          <div className={`key ${backward ? "active" : ""}`}>S &darr;</div>
          <div className={`key ${rightward ? "active" : ""}`}>D &rarr;</div>
        </div>
        <div className="raw">
          <div className={`key large ${jump ? "active" : ""}`}>Jump</div>
        </div>
      </div>
    </div>
  );
}
