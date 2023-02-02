import { SharedState } from "src/store/SharedState";

/**
 * Caches the shared state in local storage so it can
 * be persisted between page refreshes.
 * @param sharedState the SharedState to cache
 */
export function cacheInLocalStorage(sharedState: SharedState) {
  window.localStorage.setItem(
    "SHARED_STATE",
    JSON.stringify(sharedState, function replacer(key, value) {
      if (value instanceof Map) {
        return {
          dataType: "Map",
          value: Array.from(value.entries()),
        };
      } else {
        return value;
      }
    })
  );
}

/**
 * Attempts to read shared state from local storage.
 * Returns the cached shared state if it exists, or null
 * otherwise.
 */
export function readFromLocalStorage(): SharedState | null {
  const data = window.localStorage.getItem("SHARED_STATE");
  if (data !== null) {
    return JSON.parse(data, (key, value) => {
      if (typeof value === "object" && value !== null) {
        if (value.dataType === "Map") {
          return new Map(value.value);
        }
      }
      return value;
    });
  }

  return null;
}