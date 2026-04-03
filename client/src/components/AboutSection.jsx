export default function AboutSection() {
  return (
    <section className="about-section" id="story">
      <div className="about-grid">
        <aside className="reviews-sidebar">
          <h3>Customer Reviews</h3>
          <div className="review-card">
            <div className="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
            <p className="review-title">Lola's Lumpia!</p>
            <p>"The best lumpia I've ever had outside of the Philippines! The crispy wrapper, the perfectly seasoned filling — it brought back memories of my Lola's kitchen. We keep coming back!"</p>
            <span className="reviewer">— Maria S.</span>
          </div>
          <div className="review-card">
            <div className="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
            <p className="review-title">Amazing!</p>
            <p>"Lola's Lumpia is honestly worth every penny. The flavors are authentic, portions are generous, and the customer service is wonderful. Highly recommended!"</p>
            <span className="reviewer">— James R.</span>
          </div>

          <div className="story-mini">
            <h3>Our Story</h3>
            <div className="map-placeholder">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#6b4c7a" strokeWidth="1.5">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <p>San Antonio, TX</p>
            </div>
          </div>

          <div className="how-it-works">
            <h3>How it Works</h3>
            <div className="steps">
              <div className="step">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#6b4c7a" strokeWidth="1.5">
                  <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                </svg>
                <span>Select</span>
              </div>
              <div className="step-dots">&#8226;&#8226;&#8226;&#8226;</div>
              <div className="step">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#6b4c7a" strokeWidth="1.5">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                <span>Schedule</span>
              </div>
              <div className="step-dots">&#8226;&#8226;&#8226;&#8226;</div>
              <div className="step">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#6b4c7a" strokeWidth="1.5">
                  <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/>
                </svg>
                <span>Enjoy</span>
              </div>
            </div>
          </div>
        </aside>

        <div className="meet-lola">
          <div className="lola-image-wrapper">
            <img src="/images/logo.png" alt="Emma Long" className="lola-image" />
          </div>
          <div className="lola-text">
            <h2>MEET Lola - EMMA LONG</h2>
            <p>Emma Long has been perfecting her family's lumpia recipe for over fifty years. Her secret is patience and the freshest local ingredients. Every lumpia is hand-rolled and cooked with the same love she has for her grandchildren.</p>
            <a href="#story" className="learn-more">Learn More</a>
          </div>
        </div>
      </div>
    </section>
  );
}

