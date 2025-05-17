import React, { memo } from "react";
import "../Footer/style.css";

const SOCIAL_LINKS = [
  { id: "fb", text: "FB", url: "#", ariaLabel: "Facebook" },
  { id: "tw", text: "TW", url: "#", ariaLabel: "Twitter" },
  { id: "ins", text: "INS", url: "#", ariaLabel: "Instagram" },
  { id: "pt", text: "PT", url: "#", ariaLabel: "Pinterest" },
];

const ABOUT_LINKS = [
  { text: "About us", url: "#" },
  { text: "Collections", url: "#" },
  { text: "Shop", url: "#" },
  { text: "Blog", url: "#" },
  { text: "Contact us", url: "#" },
];

const USEFUL_LINKS = [
  { text: "Privacy Policy", url: "#" },
  { text: "Terms of use", url: "#" },
  { text: "Support", url: "#" },
  { text: "Shipping details", url: "#" },
  { text: "FAQs", url: "#" },
];

const PAYMENT_METHODS = [
  { name: "visa", alt: "Visa" },
  { name: "master-card", alt: "Master Card" },
  { name: "PayPal", alt: "PayPal" },
  { name: "Payoneer", alt: "Payoneer" },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="small-points-footer">
          <img src="./images/small-points.svg" alt="" aria-hidden="true" />
        </div>
        <div className="points-right-footer">
          <img
            src="./images/points-right-footer.svg"
            alt=""
            className="points-right"
            aria-hidden="true"
          />
        </div>
        <div className="footer-info">
          <div className="top-row">
            <div className="column column-1">
              <div className="logo">
                <img src="./icons/logo.svg" alt="Fashionee" />
              </div>
              <div className="about-brand">
                Cillum eu id enim aliquip aute ullamco anim. Culpa deserunt
                nostrud excepteur voluptate.
              </div>
            </div>

            <div className="links-container">
              <div className="column column-2">
                <h3 className="title">About</h3>
                <ul className="custom-list">
                  {ABOUT_LINKS.map((link) => (
                    <li className="item" key={link.text}>
                      <a href={link.url}>{link.text}</a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="column column-3">
                <h3 className="title">Useful links</h3>
                <ul className="custom-list">
                  {USEFUL_LINKS.map((link) => (
                    <li className="item" key={link.text}>
                      <a href={link.url}>{link.text}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="bottom-row">
            <div className="find-us">
              <div className="find-us-text">Find us here:</div>
              <div className="find-us-links">
                {SOCIAL_LINKS.map((link, index) => (
                  <React.Fragment key={link.id}>
                    {index > 0 && <div className="line"></div>}
                    <div className="find-us-link">
                      <a href={link.url} aria-label={link.ariaLabel}>
                        {link.text}
                      </a>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div className="column column-4">
              <h3 className="title">Newsletter</h3>
              <div className="newsletter-text">
                Subscribe to be the first to hear about deals, offers and
                upcoming collections.
              </div>
              <div className="newsletter-form">
                <form onSubmit={(e) => e.preventDefault()}>
                  <label className="sr-only" htmlFor="newsletter-email">
                    Enter your email
                  </label>
                  <div className="input-container">
                    <input
                      type="email"
                      id="newsletter-email"
                      placeholder="Enter your email"
                      className="input"
                    />
                    <button
                      type="submit"
                      className="send-button"
                      aria-label="Subscribe to newsletter"
                    >
                      <img
                        src="./icons/send.svg"
                        alt=""
                        className="send-icon"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="copyright">
          <div>© All right reserved. Fashionee {currentYear}</div>
          <div className="payment-method-container">
            <div>Payment methods:</div>
            <div className="payment-methods">
              {PAYMENT_METHODS.map((method) => (
                <div className="payment-method" key={method.name}>
                  <img src={`./icons/${method.name}.svg`} alt={method.alt} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);
