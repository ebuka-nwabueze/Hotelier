

const Footer = () => {
  const date = new Date()
  const currentDate = date.getFullYear()
  return (
    <footer className="footer">
      <p>Hotelier </p>
      <p>copyright &copy; {currentDate} - All right reserved</p>
    </footer>
  )
}

export default Footer
