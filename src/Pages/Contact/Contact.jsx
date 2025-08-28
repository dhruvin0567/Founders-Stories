import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import toast, { Toaster } from "react-hot-toast";

const Contact = () => {
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sendEmail = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(form.current);
    const data = Object.fromEntries(formData.entries());

    try {
      // Send to Admin
      await emailjs.send(
        "service_jnrnp06",
        "template_824w0po",
        {
          user_name: data.user_name,
          user_email: data.user_email,
          product_name: data.product_name,
          website_url: data.website_url,
          category: data.category,
          message: data.message,
        },
        "xXD66OwtNN0ehOvWz"
      );

      // Send to User
      await emailjs.send(
        "service_205efna",
        "template_num0fab",
        {
          to_email: data.user_email,
          name: data.user_name,
          email: data.user_email,
        },
        "xXD66OwtNN0ehOvWz"
      );

      toast.success("Message sent successfully! ✅");
      form.current.reset();
    } catch (error) {
      console.error("EmailJS Error:", error);
      toast.error("Something went wrong. Please try again later. ❌");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact-page">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="container py-4 mt-4">
        <h1 className="mb-3">Share Your Success Story</h1>
        <p className="text-muted mb-3">
          We are always on the hunt for some excellent WordPress success stories
          to share with our readers.
        </p>
        <p className="mb-4">
          <strong>If you are a founder</strong> and want to share your story,
          let us know through the form below or write an email at
          <span className="ms-1"> admin[at]wpfounders.com</span>
        </p>

        <form className="contact-form" ref={form} onSubmit={sendEmail}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Full Name*</label>
              <input
                type="text"
                className="form-control"
                name="user_name"
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Your Email*</label>
              <input
                type="email"
                className="form-control"
                name="user_email"
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Product Name*</label>
              <input
                type="text"
                className="form-control"
                name="product_name"
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Website URL</label>
              <input
                type="url"
                className="form-control"
                name="website_url"
                placeholder="https://"
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Category</label>
            <select className="form-control" name="category">
              <option value="Agency">Agency</option>
              <option value="Plugin">Plugin</option>
              <option value="Theme">Theme</option>
              <option value="Productized Service">Productized Service</option>
              <option value="SaaS">SaaS</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">
              Tell Us More About Your Product*
            </label>
            <textarea
              className="form-control custom-textarea"
              rows={8}
              name="message"
              required
            ></textarea>
          </div>

          <div className="form-check mb-4">
            <input
              className="form-check-input"
              type="checkbox"
              id="updates"
              name="subscribe"
            />
            <label className="form-check-label" htmlFor="updates">
              Get Updates Bi-Weekly.
            </label>
          </div>

          <button
            type="submit"
            className="contact-submit-btn header-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
