import { useState } from 'react'
import LoginPage from './pages/loginPage.tsx'
import { ThemeProvider } from "@/components/theme-provider"

function App() {
  return (
      <ThemeProvider defaultTheme={"dark"} storageKey={"vite-ui-theme"} >
          <LoginPage />
      </ThemeProvider>
  )
}

export default App
