import { useEffect } from "react";
import { useAppDispatch } from "./store/hooks";
import { fetchPolygons } from "./store/thunks/polygonThunks";
import { fetchObjects } from "./store/thunks/objectThunks";
import AppLayout from "./components/Layout/AppLayout";

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPolygons());
    dispatch(fetchObjects());
  }, [dispatch]);

  return <AppLayout />;
};

export default App;
