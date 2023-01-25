import React, { useContext, useSyncExternalStore } from "react";
import { Game } from "src/scenes/Game";
import { StoreContext } from "src/scenes/StoreContext";

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

  return <Game sharedState={sharedState} publish={store.publish}></Game>;
}
