import React, { useEffect, useState } from "react";

import { useLocation, useParams } from "react-router";
import { Loader } from "src/components/Loader";
import { GameController } from "src/scenes/GameController";
import { StoreContext } from "src/scenes/StoreContext";
import {
  cacheGameIdInLocalStorage,
  readFromLocalStorage,
  readGameIdFromLocalStorage,
  removeFromLocalStorage,
} from "src/store/localStorage";
import { GameMode } from "src/store/SharedState";

import { Store, YStoreFactory } from "src/store/Store";

export const StoreContextProvider = () => {
  const { gameId } = useParams();
  const location = useLocation();

  const [store, setStore] = useState<Store | undefined>();

  useEffect(() => {
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
    yStoreFactory
      .getStore(
        cachedSharedState,
        !!location?.state?.isNewGame,
        location?.state?.mode as GameMode
      )
      .then((store) => setStore(store));
  }, []);

  return !!store ? (
    <StoreContext.Provider value={store}>
      <GameController />
    </StoreContext.Provider>
  ) : (
    <Loader />
  );
};
