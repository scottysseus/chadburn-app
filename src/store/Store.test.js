import { ActionTypes } from "src/store/actions";
import {
  getInitialSharedState,
  SHARED_STATE_YMAP_NAME,
  YMapKeys,
  YStore,
} from "src/store/Store";
import * as Y from "yjs";

function getConnectedDocuments() {
  const doc1 = new Y.Doc();
  const doc2 = new Y.Doc();

  doc1.on("update", (update) => {
    Y.applyUpdate(doc2, update);
  });

  doc2.on("update", (update) => {
    Y.applyUpdate(doc1, update);
  });

  return [doc1, doc2];
}

describe("YStore", () => {
  it("shares guess updates with other players", () => {
    const [player1, player2] = getConnectedDocuments();
    const player1Store = new YStore(player1, getInitialSharedState());

    player1Store.publish({ type: ActionTypes.UPDATE_GUESS, guess: 10 });
    expect(player2.getMap(SHARED_STATE_YMAP_NAME).get(YMapKeys.GUESS)).toBe(10);
  });
});
