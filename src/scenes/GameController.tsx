import React, { useContext, useSyncExternalStore } from "react";
import { Game } from "src/scenes/Game";
import { StoreContext } from "src/scenes/StoreContext";

export function GameController() {
  const store = useContext(StoreContext);
  const sharedState = useSyncExternalStore(store.subscribe, store.getSnapshot);

  return <Game sharedState={sharedState} publish={store.publish}></Game>;
}
