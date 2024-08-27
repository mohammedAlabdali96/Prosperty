import React from "react";

export default function SocmedItem({ link, icon }) {
  return (
    <a href={link} target="_blank" rel="noreferrer noopener">
      <img src={icon} className="w-6 md:w-8" />
    </a>
  );
}
