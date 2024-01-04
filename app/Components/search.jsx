'use client';

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useDebouncedCallback } from 'use-debounce';

 
export default function Search({ placeholder }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const handleSearch = useDebouncedCallback((term) => {
     
      const params = new URLSearchParams(searchParams);
      if (term) {
        term.length>=2 && params.set('q', term);
        } else {
          params.delete('q');
        }
        replace(`${pathname}?${params.toString()}`);
      
    }, 300);
 
 
  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border focus:outline-none focus:border-blue-500 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get('')?.toString()}
      />
    </div>
  );
}