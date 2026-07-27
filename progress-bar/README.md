# Progress Bar

Two progress bar implementations, driven by a single interval in `App.jsx` and passed down as a `progress` prop (0–100, loops back to 0):

- **`NativeProgressBar.jsx`** — uses the native `<progress>` element.
- **`CustomProgressBar.jsx`** — built from styled `div`s (track + fill), with fill color shifting red → orange → green as it fills.

## Run

```bash
npm install
npm run dev
```
