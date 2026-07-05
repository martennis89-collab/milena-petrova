import React, { useState } from 'react';
import { Input } from '../ui/input';
import { FaCheckCircle, FaSpinner, FaCalendarPlus, FaApple } from 'react-icons/fa';
import { SiGooglecalendar } from 'react-icons/si';
import { trackEvent } from '../../utils/tracking';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Webinar event details
  const eventDetails = {
    title: 'Защо попадаме в отношения които ни нараняват с Милена Петрова',
    description: 'Безплатен уебинар за жени в повтарящи се нездравословни връзки. Научете защо най-важният въпрос не е "Защо той се държи така?", а "Какво ме задържа?"',
    location: 'https://meet.google.com/ahr-nxxi-dxb',
    startDate: '20260716T170000Z', // July 16, 2026, 20:00 Sofia time = 17:00 UTC
    endDate: '20260716T180000Z',   // 21:00 Sofia time = 18:00 UTC
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  // Generate Google Calendar URL
  const getGoogleCalendarUrl = () => {
    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: eventDetails.title,
      details: `${eventDetails.description}\n\nGoogle Meet линк: ${eventDetails.location}`,
      location: eventDetails.location,
      dates: `${eventDetails.startDate}/${eventDetails.endDate}`,
    });
    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  };

  // Generate .ics file for Apple Calendar
  const downloadICSFile = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Milena Petrova//Webinar//BG',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `DTSTART:${eventDetails.startDate}`,
      `DTEND:${eventDetails.endDate}`,
      `SUMMARY:${eventDetails.title}`,
      `DESCRIPTION:${eventDetails.description}\\n\\nGoogle Meet линк: ${eventDetails.location}`,
      `LOCATION:${eventDetails.location}`,
      'STATUS:CONFIRMED',
      'SEQUENCE:0',
      'BEGIN:VALARM',
      'TRIGGER:-PT30M',
      'ACTION:DISPLAY',
      'DESCRIPTION:Reminder: Webinar starts in 30 minutes',
      'END:VALARM',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'milena-petrova-webinar.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
        
        // Track Facebook Pixel Lead event
        trackEvent('Lead', {
          content_name: 'Webinar Registration',
          content_category: 'Webinar',
          value: 0.00,
          currency: 'BGN',
          predicted_ltv: 150.00,
          status: 'completed'
        });
        
        console.log('✅ Facebook Lead event tracked for webinar registration');
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

        {/* Calendar Buttons */}
        <div className="bg-gradient-to-br from-[#FFF5F7] to-[#FFE8ED] p-6 rounded-xl space-y-4">
          <p className="text-sm font-semibold text-[#2C3E50] mb-4">
            📅 Добави събитието в календара си:
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Google Calendar Button */}
            <a
              href={getGoogleCalendarUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-white hover:bg-[#D4758C] text-[#2C3E50] hover:text-white font-semibold py-3 px-4 rounded-lg border-2 border-[#D4758C] transition-all duration-200 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg"
            >
              <SiGooglecalendar className="w-5 h-5" />
              <span className="text-sm">Google Calendar</span>
            </a>

            {/* Apple Calendar Button */}
            <button
              onClick={downloadICSFile}
              className="flex items-center justify-center gap-2 bg-white hover:bg-[#2C3E50] text-[#2C3E50] hover:text-white font-semibold py-3 px-4 rounded-lg border-2 border-[#2C3E50] transition-all duration-200 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg"
            >
              <FaApple className="w-5 h-5" />
              <span className="text-sm">Apple Calendar</span>
            </button>
          </div>

          <p className="text-xs text-[#8C7A6B] mt-3">
            16 Юли 2026 • 20:00 - 21:00ч (София време)
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
