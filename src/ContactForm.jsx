// Importing React and useState hook for managing form data
import React, { useState } from "react";
import "./ContactForm.css"; // Importing external CSS for styling

// Defining the ContactForm component
export default function ContactForm() {
  // useState to store form input values
  const [formData, setFormData] = useState({
    name: "",     // stores user's name
    email: "",    // stores user's email
    phone: "",    // stores user's phone number
    message: "",  // stores user's message
  });

  // Function to handle changes in input fields
  const handleChange = (e) => {
    // Updates the corresponding field in formData when user types
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents page from refreshing
    alert("Form submitted!"); // Simple alert to confirm submission

    // Clear all input fields after submitting
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  // The UI part of the form
  return (
    <div className="contact-section">
      <form className="contact-form" onSubmit={handleSubmit}>
        <h2>Contact</h2>

        {/* Name Input Field */}
        <label>Name</label>
        <input
          type="text"
          name="name"
          placeholder="Your name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        {/* Email Input Field */}
        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={handleChange}
          required
        />

        {/* Phone Input Field */}
        <label>Phone Number</label>
        <input
          type="tel"
          name="phone"
          placeholder="+91 1234567890"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        {/* Message Textarea */}
        <label>Message</label>
        <textarea
          name="message"
          rows="4"
          placeholder="Write your message..."
          value={formData.message}
          onChange={handleChange}
          required
        />

        {/* Submit Button */}
        <button type="submit">SUBMIT</button>
      </form>
    </div>
  );
}
