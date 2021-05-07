import React from "react";

const Footer = () => {
  return (
    <footer className="wrapper">
      <span>
        <a href="https://reemify.dev" target="_blank" rel="noopener noreferrer">
          Reem's{" "}
        </a>{" "}
        take on{" "}
        <a
          href="https://docs.google.com/document/d/1SdR9rQpocsH5rPTOcxr9noqHRld5NJlylKO9Hf94U8U/edit#heading=h.31w9woubunro"
          target="_blank"
          rel="noopener noreferrer"
        >
          Shopify's Shoppies
        </a>{" "}
        challenge. Challenge accepted in 2021 <span aria-hidden="true">🤘🏼</span>
        {" "} Header image by{" "}
        <a href="https://dribbble.com/RazvanVezeteu?page=2">Razvan</a>.
      </span>
    </footer>
  );
};

export default Footer;
