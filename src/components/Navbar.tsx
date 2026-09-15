export default function Navbar() {
  return (
    <header className="site-header">
      <div className="header-left">
        <button className="menu-button" aria-label="Open menu">
          ☰
        </button>

        <nav>
          <a href="#shop">SHOP</a>
          <a href="#collection">COLLECTION</a>
          <a href="#about">ABOUT</a>
        </nav>
      </div>

      <a href="/" className="logo">
        <img src="/images/logo.jpg" alt="Daga'yi" />
      </a>

      <div className="header-right">
        <button aria-label="Search">⌕</button>
        <button aria-label="Account">♙</button>
        <button aria-label="Shopping bag">▢</button>
      </div>
    </header>
  );
}