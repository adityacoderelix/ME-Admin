export default function PropertyDescription({ description }) {
  return (
    <div className="border-b pb-6 mb-6">
      <p className="text-gray-800 mb-4">{description}</p>

      <button className="hidden  items-center font-medium">
        Show more
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="ml-1"
        >
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
    </div>
  );
}
