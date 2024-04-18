"use client";

import qs from "query-string";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { Button } from "./ui/button";

export const SearchInput = () => {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentCategoryId = searchParams.get("categoryId");

  useEffect(() => {
    const url = qs.stringifyUrl({
      url: pathname,
      query: { categoryId: currentCategoryId, title: debouncedValue },
    }, { skipEmptyString: true, skipNull: true });

    router.push(url);
  }, [debouncedValue, currentCategoryId, router, pathname]);

  return (
    <div className="flex items-center relative">
      <Input
        onChange={(e) => setValue(e.target.value)}
        value={value}
        placeholder="Поиск курса по названию"
        className="flex h-10 border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full lg:w-[600px] rounded-lg rounded-r-none focus-visible:ring-transparent pr-8"
      />
      <Button 
      className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-sky-700 text-white hover:bg-sky-700/80 h-10 px-4 py-2 rounded-l-none" type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="lucide lucide-search h-4 w-4"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg></Button>
    </div>
  );
};
