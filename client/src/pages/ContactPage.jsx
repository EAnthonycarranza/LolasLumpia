import { useState } from 'react';
import { useSettings } from '../context/SettingsContext';

export default function ContactPage() {
  const { settings } = useSettings();
  const [form, setForm] = useState({ name: '', email: '', phone: '', orderType: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (data.success) {
        setStatus('Thank you! Lola will get back to you soon.');
        setForm({ name: '', email: '', phone: '', orderType: '', message: '' });
      } else {
        setStatus('Something went wrong. Please try again.');
      }
    } catch {
      setStatus('Something went wrong. Please try again.');
    }
    setTimeout(() => setStatus(''), 4000);
  };

  const hours = settings?.hours ? Object.entries(settings.hours) : [
    ['Tuesday - Saturday', '10am - 7pm'],
    ['Sunday', '11am - 5pm'],
    ['Monday', 'Closed']
  ];

  return (
    <main className="page-content">
      <div className="page-hero page-hero-purple">
        <h1>CONTACT US</h1>
        <p>We'd love to hear from you</p>
      </div>

      <section className="contact-page-section">
        <div className="contact-grid">
          <form className="contact-form" onSubmit={handleSubmit}>
            <h2>Send Us a Message</h2>
            <input type="text" placeholder="Your Name" required value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })} />
            <input type="email" placeholder="Your Email" required value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })} />
            <input type="tel" placeholder="Phone Number" value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value })} />
            <select value={form.orderType} onChange={e => setForm({ ...form, orderType: e.target.value })}>
              <option value="">Order Type</option>
              <option value="pickup">Pick-Up</option>
              <option value="delivery">Delivery</option>
              <option value="catering">Catering</option>
            </select>
            <textarea placeholder="Your Message" rows="5" required value={form.message}
              onChange={e => setForm({ ...form, message: e.target.value })} />
            <button type="submit" className="btn-primary">SEND MESSAGE</button>
            {status && <p className="form-status">{status}</p>}
          </form>

          <div className="contact-info">
            <h3>{settings?.businessName || "Lola's Lumpia"}</h3>
            <div className="contact-detail">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              <span>{settings?.location || 'San Antonio, TX'}</span>
            </div>
            <div className="contact-detail">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
              </svg>
              <span>{settings?.phone || '(210) 555-LOLA'}</span>
            </div>
            <div className="contact-detail">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              <span>{settings?.email || 'hello@lolaslumpia.com'}</span>
            </div>
            <div className="hours">
              <h4>Hours</h4>
              {hours.map(([day, time]) => (
                <p key={day}><strong>{day}:</strong> {time}</p>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
