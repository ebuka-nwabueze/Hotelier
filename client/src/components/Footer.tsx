const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <p>Hotelier </p>
      <p>copyright &copy; {currentYear} - All right reserved</p>
    </footer>
  );
};

export default Footer;
