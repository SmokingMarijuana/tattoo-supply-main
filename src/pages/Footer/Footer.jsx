import './Footer.css';
import { Link } from 'react-router-dom';

export const Footer = () => {
    return (
        <footer className="footer-container">
            <div className="footer-content">
                <div className="footer-section">
                    <h4>About Us</h4>
                    <p>Tattoo Supply Shop Padova fornisce attrrezzatura di alta qualità per il tuo studio e per i tuoi artisti</p>
                </div>
                <div className="footer-section">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/shop">Prodotti</Link></li>
                        <li><Link to="/cart">Carrello</Link></li>
                    
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>Follow</h4>
                    <div className="social-links">
                        <a
                            href="https://www.instagram.com/tattoosupplyshop_padova/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram - Tattoo Supply Shop Padova"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                                <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 2c1.654 0 3 1.346 3 3v10c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3h10z" />
                                <path d="M12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zM17.5 6.1a1.1 1.1 0 11-2.2 0 1.1 1.1 0 012.2 0z" />
                            </svg>
                            <span className="sr-only">Instagram</span>
                        </a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Tattoo Supply Shop. All Rights Reserved.</p>
            </div>
        </footer>
    );
};
export default Footer;