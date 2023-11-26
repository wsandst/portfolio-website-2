import Link from "next/link";
import ThemeToggler from "../components/theme-toggler";

function Header() : JSX.Element {
  return (
    <>
        <header>
            <div id="header-left">
              <h1> WSANDST </h1>
            </div>
            <div id="header-right">
              <Link className="nav-link" href="/">About</Link>
              <Link className="nav-link" href="/">Projects</Link>
              <Link className="nav-link" href="/">Blog</Link>
              <ThemeToggler/>
            </div>
        </header>
    </>
  );
}
  
export default Header;