import { useState } from "react";

const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const form = e.currentTarget;
    try {
      const res = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setError("There was a problem submitting the form. Please try again later.");
      }
    } catch {
      setError("There was a problem submitting the form. Please try again later.");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
      <h3 className="text-2xl font-serif font-semibold mb-6 text-center md:text-left">Send Us a Message</h3>
      {submitted ? (
        <div className="text-green-700 font-semibold text-center py-8">
          Thank you for your submission!
        </div>
      ) : (
        <form action="https://formsubmit.co/da92c65799ef1e51d4634c48cf1b45c8" method="POST" onSubmit={handleSubmit}>
          {/* FormSubmit configuration fields */}
          <input type="hidden" name="_subject" value="New message from Moffatt Ranch website" />
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_template" value="table" />
          {/* Removed _next to prevent redirect */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 mb-2">
              Your Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-olive focus:border-olive"
              placeholder="John Doe"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-olive focus:border-olive"
              placeholder="john@example.com"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-olive focus:border-olive"
              placeholder="(555) 123-4567"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="message" className="block text-gray-700 mb-2">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-olive focus:border-olive"
              placeholder="How can we help you?"
            />
          </div>
          {error && <div className="text-red-600 mb-4 text-center">{error}</div>}
          <button
            type="submit"
            className="w-full btn-primary"
          >
            Send Message
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactForm;
