import { Route, Routes } from "solid-app-router";
import { lazy } from "solid-js";

const MainLayout = lazy(() => import("./screens/main"));
const Home = lazy(() => import("./screens/main/Home"));
const Meeting = lazy(() => import("./screens/Meeting"));
function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />}></Route>
      </Route>
      <Route path="/:meetCode" element={<Meeting/>} />
    </Routes>
  );
}

export default App;
