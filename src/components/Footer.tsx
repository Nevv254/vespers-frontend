import { ArrowUpRight, Instagram, Facebook, Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="footer">
      <div className="page-shell">
        <div className="footer__top">
          <div className="footer__brand">
            <a className="footer__wordmark" href="#home">VESPERS<span>.</span></a>
            <p>Thoughtfully crafted journeys.<br />Unforgettable African moments.</p>
          </div>
          <div className="footer__column"><p className="footer__label">EXPLORE</p><a href="#safaris">Our safaris</a><a href="#destinations">Destinations</a><a href="#experiences">Experiences</a><a href="#story">Our story</a></div>
          <div className="footer__column"><p className="footer__label">GET IN TOUCH</p><a href="mailto:hello@vespers.co.ke"><Mail size={14} /> hello@vespers.co.ke</a><a href="tel:+254000000000"><Phone size={14} /> Contact our team</a></div>
          <div className="footer__column"><p className="footer__label">FOLLOW THE JOURNEY</p><a href="#" aria-label="Instagram"><Instagram size={16} /> Instagram <ArrowUpRight size={13} /></a><a href="#" aria-label="Facebook"><Facebook size={16} /> Facebook <ArrowUpRight size={13} /></a></div>
        </div>
        <div className="footer__bottom"><span>© {new Date().getFullYear()} Vespers. All rights reserved.</span><span>MADE FOR THE LOVE OF AFRICA.</span><a href="#home">Back to top ↑</a></div>
      </div>
    </footer>
  );
}