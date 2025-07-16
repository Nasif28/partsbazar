const MailIcon = ({ size = 24, color = "#000000", ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    {...props}
  >
    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-21.818A1.636 1.636 0 010 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L.002 8.101l.008 11.265c0 .539.437.976.976.976h21.018a.976.976 0 00.976-.976L24 8.101 20.073 3.493C21.691 2.279 24 3.434 24 5.457z" />
  </svg>
);

export default MailIcon;
