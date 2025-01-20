

import "./style.css";

const Newsletter = () => {
  return (
    <div className="newsletter-container">
      <div className="newsletter-wrapper-background">
        <form className="newsletter-block">
          <div className="small-points">
            <img src="./images/small-points.svg" alt="small-points" />
          </div>
          <div className="newsletter-text">
            <div className="title">Newsletter</div>
            <div className="about-text">
              Be the first to hear about deals, offers and upcoming collections.
            </div>
          </div>
          <div className="email-button">
            <input
              type="text"
              placeholder="Enter your email"
              className="input"
            />
            <div className="button-wrapper">
              <button className="button">Subscribe</button>
              <div className="vertical-line"></div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Newsletter;
