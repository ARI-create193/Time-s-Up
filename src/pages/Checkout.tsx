import React, { useState } from 'react';
import { useCartStore } from '../stores/cartStore';
import { useAuthStore } from '../stores/authStore';

const netBankingBanks = [
  'SBI',
  'HDFC',
  'ICICI',
  'Axis',
  'Kotak',
  'PNB',
  'Other',
];

const upiApps = [
  { name: 'Paytm', img: '/paytm.png' },
  { name: 'PhonePe', img: '/phonepay.png' },
  { name: 'GPay', img: '/googlepay.png' },
  { name: 'Other', img: null }, // No image for 'Other'
];

const cardImgs = [
  { alt: 'Visa', src: 'https://img.icons8.com/color/32/000000/visa.png' },
  { alt: 'Mastercard', src: 'https://img.icons8.com/color/32/000000/mastercard-logo.png' },
  { alt: 'RuPay', src: 'https://img.icons8.com/color/32/000000/rupay.png' },
];

export const Checkout: React.FC = () => {
  const { items, getTotal, getItemCount } = useCartStore();
  const { user } = useAuthStore();
  const [address, setAddress] = useState('');
  const [name, setName] = useState(user?.email?.split('@')[0] || '');
  const [email, setEmail] = useState(user?.email || '');
  const [payment, setPayment] = useState('upi');
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Payment fields
  const [upiId, setUpiId] = useState('');
  const [upiApp, setUpiApp] = useState(upiApps[0].name);
  const [card, setCard] = useState({ number: '', expiry: '', cvv: '', holder: '' });
  const [bank, setBank] = useState('');

  const [error, setError] = useState('');

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (payment === 'upi' && (!upiId || !upiApp)) return setError('Please select UPI app and enter your UPI ID.');
    if (payment === 'card' && (!card.number || !card.expiry || !card.cvv || !card.holder)) return setError('Please fill all card details.');
    if (payment === 'netbanking' && !bank) return setError('Please select your bank.');
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h1 className="text-3xl font-bold mb-4">Order Placed!</h1>
          <p className="text-lg text-gray-700 mb-2">Thank you, {name || 'User'}! Your order has been placed.</p>
          <p className="text-gray-500">A confirmation has been sent to {email}.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-10">
      <form className="w-full max-w-5xl flex flex-col lg:flex-row gap-8" onSubmit={handlePlaceOrder}>
        {/* Left: Address and Payment */}
        <div className="flex-1 space-y-8">
          {/* Address */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Delivery Address</h2>
            <div className="mb-4">
              <label className="block font-semibold mb-1">Name</label>
              <input
                type="text"
                className="border rounded px-3 py-2 w-full"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-1">Email</label>
              <input
                type="email"
                className="border rounded px-3 py-2 w-full"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-2">
              <label className="block font-semibold mb-1">Address</label>
              <textarea
                className="border rounded px-3 py-2 w-full"
                value={address}
                onChange={e => setAddress(e.target.value)}
                required
                placeholder="Enter your full address"
              />
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Payment method</h2>
            <div className="space-y-4">
              {/* UPI */}
              <div className="border rounded p-3">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={payment === 'upi'}
                    onChange={() => setPayment('upi')}
                  />
                  <span className="ml-2 font-semibold">UPI</span>
                </label>
                {payment === 'upi' && (
                  <div className="mt-3">
                    <div className="flex gap-3 mb-3">
                      {upiApps.map(app => (
                        <button
                          type="button"
                          key={app.name}
                          className={`border rounded p-2 flex items-center gap-2 ${upiApp === app.name ? 'border-amber-600 bg-amber-50' : ''}`}
                          onClick={() => setUpiApp(app.name)}
                        >
                          {app.img && <img src={app.img} alt={app.name} className="h-6 w-6 object-contain" />}
                          <span>{app.name}</span>
                        </button>
                      ))}
                    </div>
                    <input
                      type="text"
                      className="border rounded px-3 py-2 w-full"
                      placeholder="Enter your UPI ID (e.g. name@bank)"
                      value={upiId}
                      onChange={e => setUpiId(e.target.value)}
                      required={payment === 'upi'}
                    />
                  </div>
                )}
              </div>
              {/* Card */}
              <div className="border rounded p-3">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={payment === 'card'}
                    onChange={() => setPayment('card')}
                  />
                  <span className="ml-2 font-semibold">Credit/Debit Card</span>
                  <span className="flex gap-1 ml-3">
                    {cardImgs.map(img => (
                      <img key={img.alt} src={img.src} alt={img.alt} className="h-6 w-8 object-contain" />
                    ))}
                  </span>
                </label>
                {payment === 'card' && (
                  <div className="mt-3 grid grid-cols-1 gap-3">
                    <input
                      type="text"
                      className="border rounded px-3 py-2 w-full"
                      placeholder="Card Number"
                      value={card.number}
                      onChange={e => setCard({ ...card, number: e.target.value })}
                      required={payment === 'card'}
                      maxLength={16}
                    />
                    <div className="flex gap-2">
                      <input
                        type="text"
                        className="border rounded px-3 py-2 w-full"
                        placeholder="MM/YY"
                        value={card.expiry}
                        onChange={e => setCard({ ...card, expiry: e.target.value })}
                        required={payment === 'card'}
                        maxLength={5}
                      />
                      <input
                        type="password"
                        className="border rounded px-3 py-2 w-full"
                        placeholder="CVV"
                        value={card.cvv}
                        onChange={e => setCard({ ...card, cvv: e.target.value })}
                        required={payment === 'card'}
                        maxLength={4}
                      />
                    </div>
                    <input
                      type="text"
                      className="border rounded px-3 py-2 w-full"
                      placeholder="Cardholder Name"
                      value={card.holder}
                      onChange={e => setCard({ ...card, holder: e.target.value })}
                      required={payment === 'card'}
                    />
                  </div>
                )}
              </div>
              {/* Net Banking */}
              <div className="border rounded p-3">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="netbanking"
                    checked={payment === 'netbanking'}
                    onChange={() => setPayment('netbanking')}
                  />
                  <span className="ml-2 font-semibold">Net Banking</span>
                </label>
                {payment === 'netbanking' && (
                  <div className="mt-3">
                    <select
                      className="border rounded px-3 py-2 w-full"
                      value={bank}
                      onChange={e => setBank(e.target.value)}
                      required={payment === 'netbanking'}
                    >
                      <option value="">Select your bank</option>
                      {netBankingBanks.map(b => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
              {/* COD */}
              <div className="border rounded p-3">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={payment === 'cod'}
                    onChange={() => setPayment('cod')}
                  />
                  <span className="ml-2 font-semibold">Cash on Delivery</span>
                </label>
                {payment === 'cod' && (
                  <div className="mt-3 text-green-700 font-medium">Pay with cash or card when your order arrives.</div>
                )}
              </div>
              {error && <div className="text-red-600 mt-2">{error}</div>}
            </div>
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="w-full lg:w-96">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="mb-2 flex justify-between">
              <span>Items:</span>
              <span>{getItemCount()}</span>
            </div>
            <div className="mb-2 flex justify-between">
              <span>Delivery:</span>
              <span>Free</span>
            </div>
            <div className="mb-2 flex justify-between">
              <span>Total:</span>
              <span>₹{getTotal()}</span>
            </div>
            <div className="border-t pt-4 mt-4 flex justify-between items-center">
              <span className="text-lg font-bold">Order Total:</span>
              <span className="text-2xl font-bold text-gray-900">₹{getTotal()}</span>
            </div>
            <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg font-semibold mt-6 hover:bg-primary-dark transition-colors">Use this payment method</button>
          </div>
        </div>
      </form>
    </div>
  );
}; 