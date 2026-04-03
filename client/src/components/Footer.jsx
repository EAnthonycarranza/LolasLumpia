import { useState } from 'react';
import { useSettings } from '../context/SettingsContext';

export default function Footer() {
  const { settings } = useSettings();
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      setMsg(data.message || 'Subscribed!');
      setEmail('');
    } catch {
      setMsg('Something went wrong.');
    }
    setTimeout(() => setMsg(''), 3000);
  };

  return (
    <footer className="main-footer">
      <div className="footer-top">
        <div className="footer-newsletter">
          <h3>Sign up for our newsletter</h3>
          <form className="newsletter-form" onSubmit={handleSubscribe}>
            <input type="email" placeholder="Type your email" required value={email}
              onChange={e => setEmail(e.target.value)} />
            <button type="submit" aria-label="Subscribe">&rarr;</button>
          </form>
          {msg && <p className="newsletter-msg">{msg}</p>}
        </div>
        <div className="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
        <div className="footer-logo">
          <img src="/images/logo.png" alt="Lola's Lumpia" width="80" />
        </div>
        <div className="footer-social">
          <a href={settings?.socialFacebook || "#"} aria-label="Facebook">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
          </a>
          <a href={settings?.socialInstagram || "#"} aria-label="Instagram">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
          </a>
          <a href={settings?.socialYoutube || "#"} aria-label="YouTube">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.43z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="#fff"/></svg>
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} {settings?.businessName || "Lola's Lumpia"}. Authentic Taste.</p>
      </div>
    </footer>
  );
}
