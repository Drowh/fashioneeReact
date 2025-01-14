import React from "react";

import '../Footer/footer.css'

const Footer = () => {
    return (
      <footer className="footer">
        <div className="container">
          <div className="small-points-footer">
            <img src="./images/small-points.svg" alt="small-points" />
          </div>
          <div className="points-right-footer">
            <img
              src="./images/points-right-footer.svg"
              alt="points-right-footer"
              className="points-right"
            />
          </div>
          <div className="footer-info">
            <div className="column column-1">
              <div className="logo">
                <img src="./icons/logo.svg" alt="logo" />
              </div>
              <div className="about-brand">
                Cillum eu id enim aliquip aute ullamco anim. Culpa deserunt nostrud excepteur voluptate.
              </div>
              <div className="find-us">
                <div className="find-us-text">Find us here:</div>
                <div className="find-us-links">
                  <div className="find-us-link">
                    <a href="">FB</a>
                  </div>
                  <div className="line"></div>
                  <div className="find-us-link">
                    <a href="">TW</a>
                  </div>
                  <div className="line"></div>
                  <div className="find-us-link">
                    <a href="">INS</a>
                  </div>
                  <div className="line"></div>
                  <div className="find-us-link">
                    <a href="">PT</a>
                  </div>
                </div>
              </div>
            </div>
  
            <div className="column column-2">
              <div className="title">About</div>
              <ul className="custom-list">
                <li className="item"><a href="">About us</a></li>
                <li className="item"><a href="">Collections</a></li>
                <li className="item"><a href="">Shop</a></li>
                <li className="item"><a href="">Blog</a></li>
                <li className="item"><a href="">Contact us</a></li>
              </ul>
            </div>
  
            <div className="column column-3">
              <div className="title">Useful links</div>
              <ul className="custom-list">
                <li className="item"><a href="">Privacy Policy</a></li>
                <li className="item"><a href="">Terms of use</a></li>
                <li className="item"><a href="">Support</a></li>
                <li className="item"><a href="">Shipping details</a></li>
                <li className="item"><a href="">FAQs</a></li>
              </ul>
            </div>
  
            <div className="column column-4">
              <div className="title">Newsletter</div>
              <div className="newsletter-text">
                Subscribe to be the first to hear about deals, offers and upcoming collections.
              </div>
              <div className="newsletter-form">
                <form action="">
                  <label>
                    <input type="text" placeholder="Enter your email" className="input" />
                    <img src="./icons/send.svg" alt="send" className="send-icon" />
                  </label>
                </form>
              </div>
            </div>
          </div>
          <div className="copyright">
            <div>© All right reserved. Fashionee 2020</div>
            <div className="payment-method-container">
              <div>Payment methods:</div>
              <div className="payment-methods">
                <div className="payment-method">
                  <img src="./icons/visa.svg" alt="visa" />
                </div>
                <div className="payment-method">
                  <img src="./icons/master-card.svg" alt="master-card" />
                </div>
                <div className="payment-method">
                  <img src="./icons/PayPal.svg" alt="PayPal" />
                </div>
                <div className="payment-method">
                  <img src="./icons/Payoneer.svg" alt="Payoneer" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;