export default function Hero() {
  return (
    <header className="hero" id="home">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <img src="/images/logo.png" alt="Lola's Lumpia Logo" className="hero-logo" />
        <h1>AUTHENTIC FILIPINO LUMPIA</h1>
        <p className="hero-subtitle">From Lola's Kitchen to Yours</p>
        <a href="#menu" className="btn-primary">BROWSE MENU</a>
      </div>
    </header>
  );
}
