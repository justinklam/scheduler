import React, { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(mode, replace = false) {
    if (!replace) {
      setMode(mode);
      const newHistory = [...history, mode];
      setHistory(newHistory);
    } else {
      setMode(mode);
      setHistory(prev => [...prev.slice(0, history.length - 1), mode]);
    }
  };

  function back() {
    if (history.length <= 1) {
      return;
    }
    
    // loading updatedHistory with history array
    const updatedHistory = [...history];
    // removing last entry in history
    updatedHistory.pop();

    // setting previousMode to equal to the last log in updatedHistory
    const previousMode = updatedHistory[updatedHistory.length - 1];
    setMode(previousMode);

    setHistory(updatedHistory);
  };

  return { mode, transition, back };
};