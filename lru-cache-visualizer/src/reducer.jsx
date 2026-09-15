import { useRef, useReducer } from "react";
import LRU from "./LRU";
import { EMPTY_ARRAY, EMPTY_STRING } from "./constants";

const INIT_STATE = {
  capacity: 0,
  frozenCapacity: 0,
  init: false,
  getKey: EMPTY_STRING,
  putKey: EMPTY_STRING,
  putValue: EMPTY_STRING,
  entries: EMPTY_ARRAY,
  getResult: EMPTY_STRING,
};

const TYPES = {
  SET_CAPACITY: "SET_CAPACITY",
  SET_GET_KEY: "SET_GET_KEY",
  SET_PUT_VALUE_KEYS: "SET_PUT_VALUE_KEYS",
  SET_ENTRIES: "SET_ENTRIES",
  SET_GET_RESULT: "SET_GET_RESULT",
  INIT: "INIT",
};

function reducer(state, action) {
  const { type, params } = action;
  switch (type) {
    case TYPES.SET_CAPACITY: {
      const { capacity } = params;
      return {
        ...state,
        capacity,
      };
    }

    case TYPES.SET_GET_KEY: {
      const { getKey } = params;
      return {
        ...state,
        getKey,
      };
    }

    case TYPES.SET_PUT_VALUE_KEYS: {
      const { putKey, putValue } = params;
      return {
        ...state,
        putKey,
        putValue,
      };
    }

    case TYPES.SET_ENTRIES: {
      const { entries } = params;
      return {
        ...state,
        entries,
      };
    }

    case TYPES.SET_GET_RESULT: {
      const { getResult } = params;
      return {
        ...state,
        getResult,
      };
    }

    case TYPES.INIT: {
      return {
        ...state,
        init: true,
        frozenCapacity: state?.capacity,
      };
    }

    default: {
      return state;
    }
  }
  return state;
}

function useLRU() {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  const lruRef = useRef(null);

  const { frozenCapacity, capacity, init, getKey, putKey, putValue } = state;

  const onClickCapacity = () => {
    if (init) {
      alert("value already set. Refresh to continue");
      console.log(frozenCapacity, capacity);
      dispatch({
        type: TYPES.SET_CAPACITY,
        params: {
          capacity: frozenCapacity,
        },
      });
      return;
    }

    dispatch({
      type: TYPES.INIT,
    });
    lruRef.current = new LRU(capacity);
  };

  const onCapacityChange = (newCapacity) => {
    dispatch({
      type: TYPES.SET_CAPACITY,
      params: {
        capacity: Number(newCapacity[0]),
      },
    });
  };

  const onGetValueChange = (val) => {
    const getKey = val[0];
    dispatch({
      type: TYPES.SET_GET_KEY,
      params: {
        getKey,
      },
    });
  };

  const onPutValueChange = (val) => {
    const [putKey, putValue] = val;
    dispatch({
      type: TYPES.SET_PUT_VALUE_KEYS,
      params: {
        putKey,
        putValue,
      },
    });
  };

  const onClickGet = () => {
    if (!init) {
      alert("Enter capacity first");
      return;
    }
    if (getKey == EMPTY_STRING) {
      alert("key value null");
      return;
    }

    const value = lruRef.current.get(getKey);
    dispatch({
      type: TYPES.SET_GET_RESULT,
      params: {
        getResult:
          value === -1 ? `"${getKey}" not found` : `"${getKey}" -> ${value}`,
      },
    });
    dispatch({
      type: TYPES.SET_ENTRIES,
      params: {
        entries: lruRef.current.getEntries(),
      },
    });
  };

  const onClickPut = () => {
    if (!init) {
      alert("Enter capacity first");
      return;
    }
    // this will put the value inside the lruref
    if (putKey == EMPTY_STRING || putValue == EMPTY_STRING) {
      alert("key value null");
      return;
    }
    lruRef.current.put(putKey, putValue);
    dispatch({
      type: TYPES.SET_PUT_VALUE_KEYS,
      params: {
        putKey: EMPTY_STRING,
        putValue: EMPTY_STRING,
      },
    });
    dispatch({
      type: TYPES.SET_ENTRIES,
      params: {
        entries: lruRef.current.getEntries(),
      },
    });
  };

  return {
    state,
    onClickCapacity,
    onCapacityChange,
    onGetValueChange,
    onClickGet,
    onClickPut,
    onPutValueChange,
  };
}

export default useLRU;
