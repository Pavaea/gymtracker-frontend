import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage'
import { ThemeProvider } from "@/components/theme-provider"

function App() {
  return (
      <ThemeProvider defaultTheme={"dark"} storageKey={"vite-ui-theme"} >
          <BrowserRouter basename="/gymtracker-frontend">
              <Routes>
                    <Route path={"/"} element={<LoginPage />} />
              </Routes>
          </BrowserRouter>
      </ThemeProvider>
  )
}
export default App
