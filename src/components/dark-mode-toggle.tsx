import React, { useEffect } from "react";
import Footer from "./footer";
import Header from "./header";
import Meta from "./meta";

type Props = {

}

enum ThemeMode {
  Dark,
  Light
}

function DarkModeToggle() : JSX.Element {
  const [mode, setMode] = React.useState(ThemeMode.Dark);
  useEffect(updateThemeCss, [mode]);

  function toggleMode() {
    setMode(mode == ThemeMode.Dark ? ThemeMode.Light : ThemeMode.Dark);
  }

  function updateThemeCss() {
    document.documentElement.className = "";
    if (mode == ThemeMode.Dark) {
      document.documentElement.classList.add("dark-theme");
    }
    else if (mode == ThemeMode.Light) {
      document.documentElement.classList.add("light-theme");
    }
  }

  return (
    <button onClick={toggleMode}>
      {mode == ThemeMode.Dark ? "Switch to light mode" : "Switch to dark mode" }
    </button>
  )
}

export default DarkModeToggle;
