export const OpenFilterIcon = () => {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className="icon glyph"
    >
      <path
        d="M21 8H3a1 1 0 0 1 0-2h18a1 1 0 0 1 0 2ZM19 13H5a1 1 0 0 1 0-2h14a1 1 0 0 1 0 2ZM17 18H7a1 1 0 0 1 0-2h10a1 1 0 0 1 0 2Z"
        fill="#231f20"
      />
    </svg>
  );
};

export const CloseFilterIcon = () => {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" fillRule="evenodd">
        <path d="M0 0h24v24H0z" />
        <path
          stroke="#0C0310"
          strokeWidth={2}
          strokeLinecap="round"
          d="M17 7 7 17M7 7l10 10"
        />
      </g>
    </svg>
  );
};
