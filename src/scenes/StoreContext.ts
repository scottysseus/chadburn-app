import { createContext } from "react";
import { Store } from "src/store/Store";

export const StoreContext = createContext<Store>({
  getSnapshot() {
    throw "Not implemented!";
  },
  publish() {
    throw "Not implemented!";
  },
  subscribe() {
    return () => {
      throw "Not implemented!";
    };
  },
});
