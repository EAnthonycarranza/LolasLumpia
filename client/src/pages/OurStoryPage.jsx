import { useSettings } from '../context/SettingsContext';

export default function OurStoryPage() {
  const { settings } = useSettings();

  return (
    <main className="page-content">
      <div className="page-hero page-hero-purple">
        <h1>OUR STORY</h1>
        <p>The heart and soul behind every lumpia</p>
      </div>

      <section className="story-content">
        <div className="story-main">
          <div className="story-image-wrapper">
            <img src="/images/logo.png" alt="Lola Elena" className="story-image" />
          </div>
          <div className="story-text">
            <h2>{settings?.aboutTitle || 'MEET LOLA ELENA'}</h2>
            <p>{settings?.aboutText || "Lola Elena has been perfecting her family's lumpia recipe for over fifty years. Her secret is patience and the freshest local ingredients. Every lumpia is hand-rolled and cooked with the same love she has for her grandchildren."}</p>
            <p>What started as a family tradition has grown into a beloved local business. Every morning, Lola Elena arrives at the kitchen before dawn, preparing the freshest ingredients for the day's lumpia. Her grandchildren now work alongside her, learning the techniques she perfected over decades.</p>
            <p>At Lola's Lumpia, we believe food is more than sustenance — it's a way to share love, culture, and tradition. Every bite of our lumpia carries the warmth of Filipino hospitality and the rich flavors of authentic home cooking.</p>
          </div>
        </div>

        <div className="story-values">
          <div className="value-card">
            <h3>Fresh Ingredients</h3>
            <p>We source the freshest local produce and premium meats daily. No shortcuts, no compromises.</p>
          </div>
          <div className="value-card">
            <h3>Hand-Rolled</h3>
            <p>Every single lumpia is hand-rolled with care, just like Lola taught us. It's the only way.</p>
          </div>
          <div className="value-card">
            <h3>Family Recipe</h3>
            <p>Our secret spice blend has been passed down for three generations. You can taste the tradition.</p>
          </div>
        </div>

        <div className="story-location">
          <div className="location-info">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#6b4c7a" strokeWidth="1.5">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <h3>{settings?.location || 'San Antonio, TX'}</h3>
            <p>Proudly serving authentic Filipino food</p>
          </div>
        </div>
      </section>
    </main>
  );
}
