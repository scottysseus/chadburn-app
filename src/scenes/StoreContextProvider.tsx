import React from "react";

import { useLocation, useParams } from "react-router";
import { GameController } from "src/scenes/GameController";
import { StoreContext } from "src/scenes/StoreContext";
import {
  cacheGameIdInLocalStorage,
  readFromLocalStorage,
  readGameIdFromLocalStorage,
  removeFromLocalStorage,
} from "src/store/localStorage";

import { YStoreFactory } from "src/store/Store";

export const StoreContextProvider = () => {
  const { gameId } = useParams();
  const location = useLocation();

  let cachedSharedState;
  /**
   * If the current game's ID matches the ID cached in local storage,
   * then any cached shared state corresponds with the current game,
   * so we can read it.
   */
  if (gameId === readGameIdFromLocalStorage()) {
    cachedSharedState = readFromLocalStorage();
  } else {
    /**
     * Otherwise, clear the cached shared state and cache the current gameId.
     */
    removeFromLocalStorage();
    cacheGameIdInLocalStorage(gameId);
  }

  const yStoreFactory = new YStoreFactory({ id: gameId });
  const store = yStoreFactory.getStore(
    cachedSharedState,
    !!location?.state?.isNewGame
  );

  return (
    <StoreContext.Provider value={store}>
      <GameController />
    </StoreContext.Provider>
  );
};
