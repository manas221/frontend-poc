import { useState, useRef } from "react";

import {
  generateChecklist,
  buildTreeMap,
  collectChildUpdates,
  collectParentUpdates,
} from "./utils";
import CheckboxTree from "./CheckboxTree";

const DUMMY = generateChecklist(3, 240);
const parentMap = buildTreeMap(DUMMY);

export default function App() {
  const [valueTable, setValueTable] = useState({});
  const counter = useRef({
    child: 0,
    parent: 0,
  });

  const onCheckClick = (isChecked, id, children) => {
    setValueTable((prev) => {
      const next = { ...prev, ...collectChildUpdates(isChecked, children) };

      return {
        ...next,
        ...collectParentUpdates(isChecked, id, parentMap, next),
      };
    });
  };

  return (
    <div className="App">
      <button onClick={() => console.log(counter.current)}>counter</button>
      <CheckboxTree
        checkboxes={DUMMY}
        valueTable={valueTable}
        onCheckClick={onCheckClick}
      />
    </div>
  );
}
