export const ArrowLeft = ({
  size,
  color,
}: {
  size?: number;
  color?: string;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={color || "#ffffff"}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      width={size || 24}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
      />
    </svg>
  );
};
