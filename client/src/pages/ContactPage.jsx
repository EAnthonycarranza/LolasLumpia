import { useState, useRef, useEffect } from 'react';
import { useSettings } from '../context/SettingsContext';
import ReCAPTCHA from 'react-google-recaptcha';

export default function ContactPage() {
  const { settings } = useSettings();
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', orderType: '', message: '', address: '' });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);
  const addressInputRef = useRef(null);
  const autocompleteRef = useRef(null);

  useEffect(() => {
    if (form.orderType === 'delivery' && addressInputRef.current && !autocompleteRef.current) {
      autocompleteRef.current = new window.google.maps.places.Autocomplete(addressInputRef.current, {
        types: ['address'],
        componentRestrictions: { country: 'us' }
      });

      autocompleteRef.current.addListener('place_changed', () => {
        const place = autocompleteRef.current.getPlace();
        if (place.formatted_address) {
          setForm(prev => ({ ...prev, address: place.formatted_address }));
        }
      });
    }
  }, [form.orderType]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!captchaToken) {
      alert('Please verify you are not a robot');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, captchaToken })
      });
      const data = await res.json();
      if (data.success) {
        setStatus('Thank you! Lola will get back to you soon.');
        setForm({ name: '', email: '', phone: '', subject: '', orderType: '', message: '', address: '' });
        setCaptchaToken(null);
        autocompleteRef.current = null;
      } else {
        setStatus(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('Something went wrong. Please try again.');
    }
    setLoading(false);
    setTimeout(() => setStatus(''), 5000);
  };

  const hours = settings?.hours ? (settings.hours instanceof Map ? Array.from(settings.hours.entries()) : Object.entries(settings.hours)) : [
    ['Tuesday - Saturday', '10am - 7pm'],
    ['Sunday', '11am - 5pm'],
    ['Monday', 'Closed']
  ];

  return (
    <main className="page-content">
      <div className="page-hero page-hero-purple">
        <h1>GET IN TOUCH</h1>
        <p>Lola's kitchen is always open for family and friends.</p>
      </div>

      <section className="contact-page-section animate-on-load">
        <div className="contact-container">
          <div className="contact-grid">
            <div className="contact-form-container">
              <form className="contact-form-enhanced" onSubmit={handleSubmit}>
                <div className="form-header">
                  <h2>Send Us a Message</h2>
                  <p>Have a question about catering or custom orders? Drop us a line!</p>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Your Name</label>
                    <input type="text" placeholder="Emma Long" required value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" placeholder="emma@example.com" required value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })} />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input type="tel" placeholder="(210) 555-LOLA" value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label>Inquiry Type</label>
                    <select value={form.orderType} onChange={e => {
                      setForm({ ...form, orderType: e.target.value });
                      autocompleteRef.current = null;
                    }}>
                      <option value="">General Inquiry</option>
                      <option value="pickup">Pick-Up Order</option>
                      <option value="delivery">Delivery Request</option>
                      <option value="catering">Catering Event</option>
                      <option value="feedback">Feedback</option>
                    </select>
                  </div>
                </div>

                {form.orderType === 'delivery' && (
                  <div className="form-group">
                    <label>Delivery Address</label>
                    <input 
                      ref={addressInputRef}
                      type="text" 
                      placeholder="123 Lumpia St, San Antonio, TX" 
                      required
                      value={form.address}
                      onChange={e => setForm({ ...form, address: e.target.value })} 
                    />
                  </div>
                )}

                <div className="form-group">
                  <label>Subject</label>
                  <input type="text" placeholder="How can we help?" required value={form.subject}
                    onChange={e => setForm({ ...form, subject: e.target.value })} />
                </div>

                <div className="form-group">
                  <label>Your Message</label>
                  <textarea placeholder="Tell Lola what's on your mind..." rows="5" required value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })} />
                </div>

                <div style={{ margin: '15px 0', transform: 'scale(0.85)', transformOrigin: '0 0' }}>
                  <ReCAPTCHA
                    sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY || "6LeIN6UsAAAAAEhMCahknmbAZPKtdT3JiqBuzOQU"}
                    onChange={(token) => setCaptchaToken(token)}
                  />
                </div>

                <button type="submit" className="btn-primary btn-block" disabled={loading}>
                  {loading ? 'SENDING...' : 'SEND MESSAGE'}
                </button>
                
                {status && (
                  <div className={`form-status-box ${status.includes('Thank') ? 'success' : 'error'}`}>
                    {status}
                  </div>
                )}
              </form>
            </div>

            <div className="contact-info-container">
              <div className="contact-info-card">
                <h3>Contact Information</h3>
                <p className="contact-intro">Prefer to talk? Reach out directly or visit us at our kitchen.</p>
                
                <div className="contact-methods">
                  <div className="contact-method">
                    <div className="method-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                      </svg>
                    </div>
                    <div className="method-text">
                      <h4>Location</h4>
                      <p>{settings?.location || 'San Antonio, TX'}</p>
                    </div>
                  </div>

                  <div className="contact-method">
                    <div className="method-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                      </svg>
                    </div>
                    <div className="method-text">
                      <h4>Phone</h4>
                      <p>{settings?.phone || '(210) 555-LOLA'}</p>
                    </div>
                  </div>

                  <div className="contact-method">
                    <div className="method-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                        <polyline points="22,6 12,13 2,6"/>
                      </svg>
                    </div>
                    <div className="method-text">
                      <h4>Email</h4>
                      <p>{settings?.email || 'hello@lolaslumpia.com'}</p>
                    </div>
                  </div>
                </div>

                <div className="hours-section">
                  <h4>Operating Hours</h4>
                  <ul className="hours-list">
                    {hours.map(([day, time]) => (
                      <li key={day}>
                        <span className="day">{day}</span>
                        <span className="time">{time}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="social-connect">
                  <h4>Follow Lola</h4>
                  <div className="social-icons">
                    <a href={settings?.socialFacebook || "#"} aria-label="Facebook">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
                    </a>
                    <a href={settings?.socialInstagram || "#"} aria-label="Instagram">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
