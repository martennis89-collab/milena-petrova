import React, { useState } from 'react';
import { Input } from '../ui/input';
import { FaCheckCircle, FaSpinner } from 'react-icons/fa';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const apiUrl = process.env.REACT_APP_BACKEND_URL;
      const response = await fetch(`${apiUrl}/api/webinar/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitted(true);
      } else {
        setError(data.detail || 'Възникна грешка. Моля опитайте отново.');
      }
    } catch (err) {
      setError('Възникна грешка. Моля проверете интернет връзката си.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl shadow-2xl p-8 text-center space-y-6">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <FaCheckCircle className="w-10 h-10 text-green-600" />
        </div>
        
        <div>
          <h3 style={{ fontFamily: "'Playfair Display', serif" }} className="text-2xl text-[#2C3E50] font-semibold mb-2">
            Успешна регистрация! 🎉
          </h3>
          <p className="text-[#4A4A4A] leading-relaxed">
            Благодарим ви! Проверете имейла си за детайли и линк за присъединяване към уебинара.
          </p>
        </div>

        <div className="bg-[#F5F1EB] p-4 rounded-lg text-left">
          <p className="text-sm text-[#2C3E50] font-medium mb-2">📧 Важно:</p>
          <p className="text-sm text-[#8C7A6B]">
            Проверете и SPAM папката си. Линкът за Google Meet е изпратен на вашия имейл.
          </p>
        </div>

        <div className="text-sm text-[#8C7A6B]">
          Очакваме ви на 16 Юли в 20:00ч!
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8">
      <div className="mb-6 text-center">
        <h3 style={{ fontFamily: "'Playfair Display', serif" }} className="text-2xl text-[#2C3E50] font-semibold mb-2">
          Запази своето безплатно място
        </h3>
        <p className="text-sm text-[#8C7A6B]">
          Попълнете формата и получете линка на имейла си
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-[#2C3E50] mb-2">
            Вашето име *
          </label>
          <Input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Иван Иванов"
            className="w-full"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[#2C3E50] mb-2">
            Имейл адрес *
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="ivan@example.com"
            className="w-full"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-[#2C3E50] mb-2">
            Телефон *
          </label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            required
            value={formData.phone}
            onChange={handleChange}
            placeholder="+359 888 123 456"
            className="w-full"
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#2C3E50] hover:bg-[#34495E] text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#2C3E50] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <FaSpinner className="animate-spin" />
              <span>Регистриране...</span>
            </>
          ) : (
            'Запази място безплатно'
          )}
        </button>

        <p className="text-xs text-center text-[#8C7A6B] mt-3">
          Чрез регистрацията се съгласявате да получавате имейли от Милена Петрова
        </p>
      </form>
    </div>
  );
};

export default RegistrationForm;
