import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import { AnimationProvider } from "./context";

const App = () => {
  return (
    <AnimationProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AnimationProvider>
  );
};

export default App;
