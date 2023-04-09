import { SharedState } from "src/store/SharedState";

export function cacheGameIdInLocalStorage(gameId?: string) {
  if (gameId) window.localStorage.setItem("GAME_ID", gameId);
}

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

export function readGameIdFromLocalStorage(): string | undefined {
  const data = window.localStorage.getItem("GAME_ID");

  if (data !== null) {
    return data;
  }
}

/**
 * Attempts to read shared state from local storage.
 * Returns the cached shared state if it exists, or undefined
 * otherwise.
 */
export function readFromLocalStorage(): SharedState | undefined {
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

  return undefined;
}

export function removeFromLocalStorage() {
  window.localStorage.removeItem("SHARED_STATE");
  window.localStorage.removeItem("GAME_ID");
}
