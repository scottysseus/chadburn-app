import React from "react";

import { useParams } from "react-router";
import { GameController } from "src/scenes/GameController";
import { StoreContext } from "src/scenes/StoreContext";
import { readFromLocalStorage } from "src/store/localStorage";

import { YStoreFactory } from "src/store/Store";

export const StoreContextProvider = () => {
  const { gameId } = useParams();

  const cachedSharedState = readFromLocalStorage();
  const yStoreFactory = new YStoreFactory({ id: gameId });
  const store = yStoreFactory.getStore(cachedSharedState);

  return (
    <StoreContext.Provider value={store}>
      <GameController />
    </StoreContext.Provider>
  );
};
