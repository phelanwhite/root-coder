import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/assets/styles/index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import ReactQueryProvider from "./contexts/ReactQueryProvider.tsx";
import ThemeProvider from "./features/theme/contexts/ThemeProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReactQueryProvider>
      <BrowserRouter>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </ReactQueryProvider>
  </StrictMode>
);
