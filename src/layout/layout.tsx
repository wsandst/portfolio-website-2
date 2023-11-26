import Footer from "./footer";
import Header from "./header";
import Meta from "./meta"

type Props = {
  children: React.ReactNode
}

function Layout({ children }: Props) : JSX.Element {
  return (
    <>
      <Meta />
      <div id="main-layout">
        <Header/>
        <div className="min-h-screen">
          <main>{children}</main>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Layout;
