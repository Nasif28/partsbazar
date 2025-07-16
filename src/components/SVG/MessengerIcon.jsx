const MessengerIcon = ({ size = 24, color = "#0084FF", ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    {...props}
  >
    <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.616 4.469 8.653V24l4.088-2.242c1.092.301 2.246.464 3.442.464 6.628 0 12-4.974 12-11.111S18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26 6.559-6.963 3.13 3.259 5.889-3.259-6.56 6.963z" />
  </svg>
);

export default MessengerIcon;
