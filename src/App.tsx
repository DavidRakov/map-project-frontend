import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { useAppDispatch } from "./store/hooks";
import { fetchPolygons } from "./store/thunks/polygonThunks";
import { fetchObjects } from "./store/thunks/objectThunks";
import AppLayout from "./components/Layout/AppLayout";

const AppInit = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPolygons());
    dispatch(fetchObjects());
  }, [dispatch]);

  return <AppLayout />;
};

const App = () => {
  return (
    <Provider store={store}>
      <AppInit />
    </Provider>
  );
};

export default App;
