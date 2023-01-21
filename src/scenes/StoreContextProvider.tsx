import React from "react";

import { useParams } from "react-router";
import { GameController } from "src/scenes/game/GameController";
import { YStoreFactory } from "src/store/Store";
import { StoreContext } from "src/store/StoreContext";

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
