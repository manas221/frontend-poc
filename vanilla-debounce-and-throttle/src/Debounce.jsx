import { useState, useRef, useCallback } from "react";

import './styles.css';

import { debounce } from './utils';

export default function Debounce() {
  const rawEventCountRef = useRef(0)
  const debouncedEventCountRef = useRef(0)

  const [text, setText] = useState("");

  const [rawValue, setRawValue] = useState([]);
  const [debouncedValue, setDebouncedValue] = useState([]);

  const [delay, setDelay] = useState(200);
  const [immediate, setImmediate] = useState(true);

  const debouncedSetter = useCallback(debounce((val) => {
    setDebouncedValue(prev => ([...prev, val]))
    debouncedEventCountRef.current += 1;
  }, delay, immediate), [delay, immediate]);

  const onInputChange = ev => {
    setText(ev.target.value)
    setRawValue(prev => ([...prev, ev.target.value]))
    debouncedSetter(ev.target.value)
    rawEventCountRef.current += 1;
  }

  return (
    <div className="Debounce">
      <h1>Debounce</h1>
      <label className="field">
        <span>Try to type continuously:</span>
        <input value={text} onChange={onInputChange} className="input" />
      </label>

      <label className="field">
        <span>Debounce delay: {delay}ms</span>
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
              checked={immediate}
              onChange={ev => setImmediate(ev.target.checked)}
            />
            Immediate
          </label>
        </div>
      </label>

      <div className="panels">
        <div className="panel">
          <h2>Raw</h2>
          <p className="count">Events: {rawEventCountRef.current}</p>
          <p className="values">[{rawValue.map(item => `${item}, `)}]</p>
        </div>

        <div className="panel">
          <h2>Debounced</h2>
          <p className="count">
            Events: {debouncedEventCountRef.current} (
            {rawEventCountRef.current > 0
              ? ((debouncedEventCountRef.current / rawEventCountRef.current) * 100).toFixed(1)
              : 0}
            % of raw events)
          </p>
          <p className="values">[{debouncedValue.map(item => `${item}, `)}]</p>
        </div>
      </div>
    </div>
  );
}
