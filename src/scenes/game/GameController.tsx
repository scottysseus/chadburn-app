import React, { useContext, useSyncExternalStore } from "react";
import { Game } from "src/scenes/game/Game";
import { StoreContext } from "src/store/StoreContext";

export function GameController() {
  const store = useContext(StoreContext);
  const sharedState = useSyncExternalStore(store.subscribe, store.getSnapshot);

  return <Game sharedState={sharedState} publish={store.publish}></Game>;
}
