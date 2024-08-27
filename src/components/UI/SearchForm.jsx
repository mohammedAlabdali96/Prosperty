"use client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SearchForm({
  btnClassName,
  inputClassName,
  wrapperClassName,
  placeholder,
}) {
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get("search") || "");

  return (
    <form
      className={`flex gap-3 md:max-w-[578px] md:mx-auto ${wrapperClassName}`}
    >
      <input
        placeholder={placeholder}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        name="search"
        className={`input w-full ${inputClassName} placeholder:text-sm`}
      />
      <button className={`btn btn-primary ${btnClassName}`}>Search</button>
    </form>
  );
}
