"use client";

import qs from "query-string";
import { IconType } from "react-icons";
import { 
  usePathname, 
  useRouter, 
  useSearchParams
} from "next/navigation";

import { cn } from "@/lib/utils";

interface CategoryItemProps {
  label: string;
  value?: string;
  icon?: IconType;
};

export const CategoryItem = ({
  label,
  value,
  icon: Icon,
}: CategoryItemProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategoryId = searchParams.get("categoryId");
  const currentTitle = searchParams.get("title");

  const isSelected = currentCategoryId === value;

  const onClick = () => {
    const url = qs.stringifyUrl({
      url: pathname,
      query: {
        title: currentTitle,
        categoryId: isSelected ? null : value,
      }
    }, { skipNull: true, skipEmptyString: true });

    router.push(url);
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "py-2 px-3 text-sm bg-white rounded-md flex items-center gap-x-1 hover:shadow-sm transition cursor-pointer border",
        isSelected && "border-sky-800/10 bg-sky-500/10 text-sky-800"
      )}
      type="button"
    >
      <div className="truncate text-sm font-semibold">
        {label}
      </div>
    </button>
  )
}

export const AllCategoriesButton = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategoryId = searchParams.get("categoryId");
  const currentTitle = searchParams.get("title");

  const isSelected = currentCategoryId === null;

  const onClick = () => {
    const url = qs.stringifyUrl({
      url: pathname,
      query: {
        title: currentTitle,
        categoryId: null,
      }
    }, { skipNull: true, skipEmptyString: true });

    router.push(url);
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "py-2 px-3 text-sm rounded-md flex items-center gap-x-1 hover:shadow-sm transition cursor-pointer border",
        isSelected ? "border-sky-800/10 bg-sky-500/10 text-sky-800" : "bg-white"
      )}
      type="button"
    >
      <div className="truncate text-sm font-semibold">
        Все
      </div>
    </button>
  )
}
