import { Provider } from "react-redux";
import { store } from "./store";
import { FC, PropsWithChildren } from "react";

const StoreProvider: FC<PropsWithChildren> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
