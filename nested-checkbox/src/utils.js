/**
 * Shape of a single node in the checklist tree.
 * `children` is null for a leaf, or a non-empty array of nodes.
 */
export const DUMMY = {
  id: "k3f9a1b2",
  label: "Item 1",
  checked: false,
  children: null,
};

const ID_LENGTH = 8;

// uuid-ish alphanumeric ids, unique within a single generated tree.
function createIdFactory() {
  const used = new Set();

  return () => {
    let id;
    do {
      id = Math.random().toString(36).slice(2, 2 + ID_LENGTH).padEnd(ID_LENGTH, "0");
    } while (used.has(id));
    used.add(id);
    return id;
  };
}

export function generateChecklist(depth, size) {
  const total = Math.max(0, Math.floor(size) || 0);
  if (total === 0) return [];

  const maxDepth = Math.min(Math.max(1, Math.floor(depth) || 1), total);

  const nextId = createIdFactory();
  const roots = [];
  const openParents = []; // nodes that may still take children, i.e. level < maxDepth
  let created = 0;

  const makeNode = (level, parent) => {
    const node = {
      id: nextId(),
      label: `Item ${++created}`,
      checked: false,
      children: null,
    };

    if (parent) {
      if (parent.children === null) parent.children = [];
      parent.children.push(node);
    } else {
      roots.push(node);
    }

    if (level < maxDepth) openParents.push({ node, level });
    return node;
  };

  // Spine first, so the tree is guaranteed to actually reach maxDepth.
  let parent = null;
  for (let level = 1; level <= maxDepth; level++) {
    parent = makeNode(level, parent);
  }

  // Remaining nodes go to a random open parent, or become a new root.
  while (created < total) {
    const pick = Math.floor(Math.random() * (openParents.length + 1));
    if (pick === openParents.length) {
      makeNode(1, null);
    } else {
      const { node, level } = openParents[pick];
      makeNode(level + 1, node);
    }
  }

  return roots;
}

export function buildTreeMap(data, parent = null, map = new Map()) {
  data?.forEach(
    node => {
      map.set(node?.id, parent);
      if (node?.children?.length > 0) {
        buildTreeMap(node?.children, node, map);
      }
    }
  )

  return map;
}

export const isChildValid = (children) =>
  Array.isArray(children) && children.length > 0;

// Walks down from the clicked node and returns { [id]: isChecked } for every
// descendant. Caller merges the result into state.
export function collectChildUpdates(isChecked, children) {
  const updates = {};
  const stack = [children];

  while (stack.length > 0) {
    const currentChildren = stack.pop();

    if (!isChildValid(currentChildren)) {
      continue;
    }

    currentChildren.forEach((child) => {
      updates[child?.id] = isChecked;
      const grandChild = child?.children;
      if (isChildValid(grandChild)) {
        stack.push(grandChild);
      }
    });
  }

  return updates;
}

// Walks up from the clicked node, checking a parent only when all of its
// children are checked. `valueTable` should already include the child updates
// from this same click, so the sibling lookups see fresh values.
export function collectParentUpdates(isChecked, id, parentMap, valueTable) {
  const updates = {};
  const readValue = (nodeId) =>
    nodeId in updates ? updates[nodeId] : valueTable[nodeId] || false;

  const stack = [[id, isChecked]];

  while (stack.length > 0) {
    const item = stack.pop();

    if (item == null) {
      continue;
    }

    const [nodeId, checkValue] = item;

    updates[nodeId] = checkValue;

    const parent = parentMap.get(nodeId);
    const siblings = parent?.children;

    if (!isChildValid(siblings)) {
      continue;
    }

    const isEverySiblingTrue = siblings.every((child) => readValue(child?.id));

    stack.push([parent?.id, isEverySiblingTrue]);
  }

  return updates;
}
