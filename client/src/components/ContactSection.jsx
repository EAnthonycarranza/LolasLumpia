import { useState } from 'react';
import { useSettings } from '../context/SettingsContext';

export default function ContactSection() {
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

  return (
    <section className="contact-section" id="contact">
      <h2 className="section-title">GET IN TOUCH</h2>
      <div className="contact-grid">
        <form className="contact-form" onSubmit={handleSubmit}>
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
          <textarea placeholder="Your Message" rows="4" required value={form.message}
            onChange={e => setForm({ ...form, message: e.target.value })} />
          <button type="submit" className="btn-primary">SEND MESSAGE</button>
          {status && <p className="form-status">{status}</p>}
        </form>
        <div className="contact-info">
          <h3>{settings?.businessName || "Lola's Lumpia"}</h3>
          <p>{settings?.location || 'San Antonio, TX'}</p>
          <p>Phone: {settings?.phone || '(210) 555-LOLA'}</p>
          <p>Email: {settings?.email || 'hello@lolaslumpia.com'}</p>
          <div className="hours">
            <h4>Hours</h4>
            {settings?.hours ? Object.entries(settings.hours).map(([day, time]) => (
              <p key={day}>{day}: {time}</p>
            )) : (
              <>
                <p>Tuesday – Saturday: 10am – 7pm</p>
                <p>Sunday: 11am – 5pm</p>
                <p>Monday: Closed</p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
