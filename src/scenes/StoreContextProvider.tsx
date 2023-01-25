import React from "react";

import { useParams } from "react-router";
import { GameController } from "src/scenes/GameController";
import { StoreContext } from "src/scenes/StoreContext";
import { YStoreFactory } from "src/store/Store";

export const StoreContextProvider = () => {
  const { gameId } = useParams();

  const yStoreFactory = new YStoreFactory({ id: gameId });
  const store = yStoreFactory.getStore();

  return (
    <StoreContext.Provider value={store}>
      <GameController />
    </StoreContext.Provider>
  );
};
