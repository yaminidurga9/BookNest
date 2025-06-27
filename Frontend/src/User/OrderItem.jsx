import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Unavbar from './Unavbar';

const OrderItem = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [formData, setFormData] = useState({
    flatno: '',
    city: '',
    state: '',
    pincode: ''
  });
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    axios.get(`http://localhost:4000/item/${id}`)
      .then(res => setItem(res.data))
      .catch(err => console.error('Item not found:', err));
  }, [id]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
  flatno,
  city,
  state,
  pincode,
  totalamount,
  BookingDate,
  Delivery,
  description,
  userId,               // ✅ User who is placing the order
  userName,             // ✅ User's name

  // ✅ ADD these two to fix seller view
  sellerId: book.userId,     // This is the seller's ID — must be set correctly
  seller: book.userName,     // Seller's name
  booktitle: book.title,
  bookauthor: book.author,
  bookgenre: book.genre,
  itemImage: book.itemImage,
};

    try {
      await axios.post('http://localhost:4000/userorder', orderData);
      alert('Order placed successfully!');
      navigate('/myorders');
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen pb-10">
      <Unavbar />
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
        {item && (
          <>
            <h2 className="text-2xl font-bold text-center mb-6">Confirm Order for: {item.title}</h2>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
  <img
    src={`http://localhost:4000/${item.itemImage}`}
    alt={item.title}
    style={{
      width: '180px',
      height: '250px',
      objectFit: 'cover',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
    }}
  />
</div>


            <p className="text-lg"><strong>Price:</strong> ${item.price}</p>
            <p className="text-lg mb-4"><strong>Seller:</strong> {item.userName}</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" name="flatno" placeholder="Flat No" onChange={handleChange} required className="block w-full p-2 border rounded" />
              <input type="text" name="city" placeholder="City" onChange={handleChange} required className="block w-full p-2 border rounded" />
              <input type="text" name="state" placeholder="State" onChange={handleChange} required className="block w-full p-2 border rounded" />
              <input type="text" name="pincode" placeholder="Pincode" onChange={handleChange} required className="block w-full p-2 border rounded" />

              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>
  <button
    type="submit"
    style={{
      backgroundColor: '#2563eb', // Tailwind's blue-600
      color: '#fff',
      padding: '10px 20px',
      borderRadius: '6px',
      border: 'none',
      fontWeight: '600',
      fontSize: '16px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    }}
    onMouseOver={(e) => e.target.style.backgroundColor = '#1e40af'} // Tailwind's blue-800
    onMouseOut={(e) => e.target.style.backgroundColor = '#2563eb'}
  >
    Confirm Order
  </button>
</div>

            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderItem;
