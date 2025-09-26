// components/Footer.js
import React from 'react';
import NavMenu from './NavMenu';

export default function Footer({ footer }) {
  if (!footer) return null;

  if (footer.content) {
    return <footer dangerouslySetInnerHTML={{ __html: footer.content }} />;
  }

  return (
    <footer>
      <div className="container">
        <p>© 2025 Your Company</p>
        {footer && <NavMenu menu={footer} className="footer-nav" />}
      </div>
    </footer>
  );
}
