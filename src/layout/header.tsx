import ThemeToggler from "../components/theme-toggler";

function Header() : JSX.Element {
  return (
    <>
        <div className="header">
            <ThemeToggler/>
            <h1> Header </h1>
        </div>
    </>
  );
}
  
export default Header;