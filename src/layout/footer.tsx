import Link from "next/link";

function Footer() : JSX.Element {
  return (
    <footer>
        <div id="footer-left">
          <Link className="nav-link" href="/about/#contact">Contact</Link>
        </div>
        <div id="footer-right">
          <span> Copyright {getCurrentYear()} </span>
        </div>
    </footer>
  );
}

function getCurrentYear() {
  return new Date().getFullYear();
}
  
export default Footer;