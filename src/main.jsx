import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "@emotion/react";
import { BreadcrumbProvider } from "./context/BreadcrumbContext.jsx";
import theme from "./styles/theme.js";
import store from "./store/store.js";
import App from "./App.jsx";
import "./styles/main.scss";
// import "./index.css";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <BreadcrumbProvider>
          <App />
        </BreadcrumbProvider>
      </BrowserRouter>
    </ThemeProvider>
  </Provider>,
);
