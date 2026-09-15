import ButtonWithInput from "./ButtonWithInputV2";
import useLRU from "./reducer";

export default function App() {
  const {
    state,
    onClickCapacity,
    onCapacityChange,
    onClickGet,
    onClickPut,
    onPutValueChange,
    onGetValueChange,
  } = useLRU();
  const {
    init,
    frozenCapacity,
    capacity,
    getKey,
    putKey,
    putValue,
    entries,
    getResult,
  } = state;
  return (
    <div className="App">
      <div className="lruContainer">
        <h1 className="title">LRU Cache Visualizer</h1>

        <ButtonWithInput
          onButtonSubmit={onClickCapacity}
          buttonLabel={"capacity"}
          inputPlaceholders={["capacity"]}
          inputValues={[capacity]}
          buttonDisabled={init}
          inputOnChangeHandler={onCapacityChange}
        />
        <ButtonWithInput
          onButtonSubmit={onClickGet}
          buttonLabel="get"
          inputPlaceholders={["key to get"]}
          inputValues={[getKey]}
          inputOnChangeHandler={onGetValueChange}
        />
        <ButtonWithInput
          onButtonSubmit={onClickPut}
          buttonLabel="put"
          inputPlaceholders={["key to put", "value to put"]}
          inputValues={[putKey, putValue]}
          inputOnChangeHandler={onPutValueChange}
        />

        {init ? (
          <div className="statusRow">
            <span className="capacityBadge">Capacity: {frozenCapacity}</span>
            {getResult ? (
              <span className="getResult">{getResult}</span>
            ) : null}
          </div>
        ) : null}

        <div className="cache">
          {entries.length > 0 ? (
            <>
              <div className="cacheLabels">
                <span>← Least recently used</span>
                <span>Most recently used →</span>
              </div>
              <div className="cacheEntries">
                {entries.map(([key, value]) => (
                  <div key={key} className="cacheEntry">
                    <span className="entryKey">{key}</span>
                    <span className="entryValue">{value}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="emptyState">
              {init ? "Cache is empty" : "Set a capacity to get started"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
