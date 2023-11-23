import DarkModeToggle from "./dark-mode-toggle";

function Header() : JSX.Element {
  return (
    <>
        <div className="header">
            <DarkModeToggle/>
            <h1> Header </h1>
        </div>
    </>
  );
}
  
export default Header;
  