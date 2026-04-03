import { useState, useRef, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import ReCAPTCHA from 'react-google-recaptcha';

export default function Cart() {
  const { cart, isOpen, setIsOpen, changeQty, removeFromCart, clearCart, totalPrice } = useCart();
  const [checkoutForm, setCheckoutForm] = useState(null);
  const [orderStatus, setOrderStatus] = useState('');
  const [captchaToken, setCaptchaToken] = useState(null);
  const addressInputRef = useRef(null);
  const autocompleteRef = useRef(null);

  useEffect(() => {
    if (checkoutForm && checkoutForm.orderType === 'delivery' && addressInputRef.current && !autocompleteRef.current) {
      autocompleteRef.current = new window.google.maps.places.Autocomplete(addressInputRef.current, {
        types: ['address'],
        componentRestrictions: { country: 'us' }
      });

      autocompleteRef.current.addListener('place_changed', () => {
        const place = autocompleteRef.current.getPlace();
        if (place.formatted_address) {
          setCheckoutForm(prev => ({ ...prev, address: place.formatted_address }));
        }
      });
    }
  }, [checkoutForm]);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setCheckoutForm({ customerName: '', email: '', phone: '', orderType: 'pickup', address: '', notes: '' });
  };

  const submitOrder = async (e) => {
    e.preventDefault();
    if (!captchaToken) {
      alert('Please verify you are not a robot');
      return;
    }

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...checkoutForm,
          items: cart.map(i => ({ menuItem: i._id, name: i.name, quantity: i.qty, price: i.price })),
          total: totalPrice,
          captchaToken
        })
      });
      if (res.ok) {
        setOrderStatus('Order placed! Lola will start preparing your food.');
        clearCart();
        setCheckoutForm(null);
        setCaptchaToken(null);
        setTimeout(() => { setOrderStatus(''); setIsOpen(false); }, 3000);
      } else {
        const data = await res.json();
        setOrderStatus(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setOrderStatus('Something went wrong. Please try again.');
    }
  };

  return (
    <>
      {isOpen && <div className="cart-overlay active" onClick={() => setIsOpen(false)} />}
      <div className={`cart-sidebar ${isOpen ? 'active' : ''}`}>
        <div className="cart-header">
          <h3>Your Cart</h3>
          <button className="cart-close" onClick={() => setIsOpen(false)}>&times;</button>
        </div>
        <div className="cart-items">
          {cart.length === 0 && !orderStatus ? (
            <p className="cart-empty">Your cart is empty</p>
          ) : orderStatus ? (
            <p className="cart-empty" style={{ color: '#6b4c7a', fontStyle: 'normal', fontWeight: 700 }}>{orderStatus}</p>
          ) : checkoutForm ? (
            <form className="checkout-form" onSubmit={submitOrder}>
              <input type="text" placeholder="Your Name" required value={checkoutForm.customerName}
                onChange={e => setCheckoutForm({ ...checkoutForm, customerName: e.target.value })} />
              <input type="email" placeholder="Your Email" required value={checkoutForm.email}
                onChange={e => setCheckoutForm({ ...checkoutForm, email: e.target.value })} />
              <input type="tel" placeholder="Phone Number" value={checkoutForm.phone}
                onChange={e => setCheckoutForm({ ...checkoutForm, phone: e.target.value })} />
              <select value={checkoutForm.orderType}
                onChange={e => {
                  setCheckoutForm({ ...checkoutForm, orderType: e.target.value });
                  autocompleteRef.current = null; // Reset for next potential delivery selection
                }}>
                <option value="pickup">Pick-Up</option>
                <option value="delivery">Delivery</option>
                <option value="catering">Catering</option>
              </select>
              {checkoutForm.orderType === 'delivery' && (
                <input 
                  ref={addressInputRef}
                  type="text" 
                  placeholder="Delivery Address" 
                  required
                  value={checkoutForm.address}
                  onChange={e => setCheckoutForm({ ...checkoutForm, address: e.target.value })} 
                />
              )}
              <textarea placeholder="Special instructions" rows="3" value={checkoutForm.notes}
                onChange={e => setCheckoutForm({ ...checkoutForm, notes: e.target.value })} />
              
              <div style={{ margin: '15px 0', transform: 'scale(0.85)', transformOrigin: '0 0' }}>
                <ReCAPTCHA
                  sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY || "6LeIN6UsAAAAAEhMCahknmbAZPKtdT3JiqBuzOQU"}
                  onChange={(token) => setCaptchaToken(token)}
                />
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%' }}>PLACE ORDER — ${totalPrice.toFixed(2)}</button>
              <button type="button" className="btn-back" onClick={() => setCheckoutForm(null)}>Back to Cart</button>
            </form>
          ) : (
            cart.map(item => (
              <div key={item._id} className="cart-item">
                <div className="cart-item-info">
                  <h4>{item.name}</h4>
                  <p>${item.price.toFixed(2)} each</p>
                </div>
                <div className="cart-item-actions">
                  <button className="qty-btn" onClick={() => changeQty(item._id, -1)}>-</button>
                  <span className="cart-item-qty">{item.qty}</span>
                  <button className="qty-btn" onClick={() => changeQty(item._id, 1)}>+</button>
                  <button className="cart-item-remove" onClick={() => removeFromCart(item._id)}>&times;</button>
                </div>
              </div>
            ))
          )}
        </div>
        {!checkoutForm && !orderStatus && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Total:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <button className="btn-primary cart-checkout" onClick={handleCheckout}>CHECKOUT</button>
          </div>
        )}
      </div>
    </>
  );
}
