// Archived approach: the original recursive solution for this nested checkbox.
// Kept for reference only — the app now uses the iterative helpers in ./utils.js.

import { isChildValid } from "./utils";

export const markChildrenChecked = (isChecked, children, setIdChecked) => {
  if (!isChildValid(children)) {
    return;
  }

  children.forEach((child) => {
    setIdChecked(child?.id, isChecked);
    markChildrenChecked(isChecked, child?.children, setIdChecked);
  });
};

export const markParentChecked = (
  isChecked,
  id,
  setIdChecked,
  parentMap,
  valueTable
) => {
  setIdChecked(id, isChecked);

  const parent = parentMap.get(id);

  if (parent === null) {
    return;
  }

  const siblings = parent?.children;

  if (!isChildValid(siblings)) {
    return;
  }

  let isEverySiblingTrue = true;

  siblings.forEach((child) => {
    const childValue =
      child?.id === id ? isChecked : valueTable[child?.id] || false;
    isEverySiblingTrue = isEverySiblingTrue && childValue;
  });

  markParentChecked(
    isEverySiblingTrue,
    parent?.id,
    setIdChecked,
    parentMap,
    valueTable
  );
};
