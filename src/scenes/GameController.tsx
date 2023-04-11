import React, { useContext, useEffect, useSyncExternalStore } from "react";
import { Loader } from "src/components/Loader";
import { Game } from "src/scenes/game/Game";
import { StoreContext } from "src/scenes/StoreContext";

import { cacheInLocalStorage } from "src/store/localStorage";

/**
 * GameController connects the game scene to the Yjs store. Yjs is the
 * source of truth for the state shared between all players.
 *
 * store.publish allows the game scene to publish its state updates to the store,
 * which shares them with the other players.
 */
export function GameController() {
  const store = useContext(StoreContext);
  const sharedState = useSyncExternalStore(store.subscribe, store.getSnapshot);

  useEffect(() => {
    if (sharedState) {
      cacheInLocalStorage(sharedState);
    }
  }, [sharedState]);

  /**
   * If sharedState is undefined, show a loader instead
   */
  return (
    <>
      {sharedState ? (
        <Game sharedState={sharedState} publish={store.publish}></Game>
      ) : (
        <Loader />
      )}
    </>
  );
}
