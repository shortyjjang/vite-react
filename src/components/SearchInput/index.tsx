import { forwardRef, useState } from "react";
import IconSearchMono from "../../assets/images/icon-search-mono";
import { twMerge } from "tailwind-merge";

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSearch: (value: string) => void;
  className?: string;
}

export default forwardRef<HTMLInputElement, SearchInputProps>(
  function SearchInput({className = "", ...props}, ref) {
    const [keyword, setKeyword] = useState(props?.value || "");
    return (
      <div className={twMerge("relative", className)}>
        <input
          type="text"
          ref={ref}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="w-full py-4"
        />
        <button onClick={() => props.onSearch(String(keyword))} title="검색" className="text-gray-500 absolute right-2 top-1/2 -translate-y-1/2">
          <IconSearchMono />
        </button>
      </div>
    );
  }
);
