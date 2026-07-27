import { useState, useRef, useCallback } from "react";

import './styles.css';

import { throttle } from './utils';

const TRAIL_LENGTH = 100;

export default function Throttle() {
  const trackerRef = useRef(null);

  const [rawTrail, setRawTrail] = useState([]);
  const [throttledTrail, setThrottledTrail] = useState([]);

  const [delay, setDelay] = useState(200);
  const [trailing, setTrailing] = useState(true);

  const throttledSetPosition = useCallback(throttle((position) => {
    setThrottledTrail(prev => [...prev, position].slice(-TRAIL_LENGTH))
  }, delay, trailing), [delay, trailing]);

  const onCursorMove = ev => {
    const rect = trackerRef.current.getBoundingClientRect();
    const events = ev.nativeEvent.getCoalescedEvents?.() ?? [ev.nativeEvent];

    const positions = events.map(event => ({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    }));

    setRawTrail(prev => [...prev, ...positions].slice(-TRAIL_LENGTH));
    positions.forEach(throttledSetPosition);
  }

  return (
    <div className="Throttle">
      <h1>Throttle</h1>

      <div className="field">
        <span>Move cursor in below box:</span>
        <div
          ref={trackerRef}
          onPointerMove={onCursorMove}
          className="trackerBox cursorTracker"
        />
      </div>

      <label className="field">
        <span>Throttle delay: {delay}ms</span>
        <div className="delayControls">
          <input
            type="range"
            min={50}
            max={4000}
            step={50}
            value={delay}
            onChange={ev => setDelay(Number(ev.target.value))}
            className="slider"
          />
          <label className="toggle">
            <input
              type="checkbox"
              checked={trailing}
              onChange={ev => setTrailing(ev.target.checked)}
            />
            Trailing
          </label>
        </div>
      </label>

      <div className="panels">
        <div className="trackerBox">
          <h2>Raw</h2>
          {rawTrail.map((position, i) => (
            <div
              key={i}
              className="marker"
              style={{ left: `${position.x}%`, top: `${position.y}%`, opacity: (i + 1) / rawTrail.length }}
            />
          ))}
        </div>

        <div className="trackerBox">
          <h2>Throttled</h2>
          {throttledTrail.map((position, i) => (
            <div
              key={i}
              className="marker"
              style={{ left: `${position.x}%`, top: `${position.y}%`, opacity: (i + 1) / throttledTrail.length }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
