
import darkThemeIcon from "../../public/assets/dark.svg";
import lightThemeIcon from "../../public/assets/light.svg";
import Image from 'next/image';


/**
 * Component representing a theme toggler,
 * which can switch between light and dark mode.
 */
function ThemeToggler() : JSX.Element {

  function setTheme(themeName: string) {
    document.documentElement.className = themeName;
    localStorage.setItem("theme", themeName);
  }

  // Use a button for every theme toggle and change their visibility using CSS
  return (
    <>
      <button onClick={() => setTheme("dark-theme")} id="dark-theme-toggle">
        <Image height={25} width={25} priority src={darkThemeIcon} alt="Switch to dark mode"/>
      </button>
      <button onClick={() => setTheme("light-theme")} id="light-theme-toggle">
        <Image height={25} width={25} priority src={lightThemeIcon} alt="Switch to light mode"/>
      </button>
    </>
  )
}

export default ThemeToggler;
