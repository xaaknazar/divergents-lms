"use client";

import { Category } from "@prisma/client";
import {
  FcConferenceCall,
  FcReading,
  FcStatistics,
  FcSportsMode,
  FcMindMap,
  FcServices
} from 'react-icons/fc';
import { IconType } from 'react-icons';

import { CategoryItem, AllCategoriesButton } from "./category-item";

interface CategoriesProps {
  items: Category[];
}

const iconMap: Record<Category["name"], IconType> = {
  "Лидерство": FcSportsMode,  
  "Саморазвитие": FcReading,
  "Менеджмент": FcStatistics,
  "⁠Отношения": FcConferenceCall,
  "⁠Мышление": FcMindMap,
  "Навыки": FcServices
};

export const Categories = ({
  items,
}: CategoriesProps) => {
  return (
    <div className="flex items-center gap-x-3 overflow-x-auto pb-2">
      <AllCategoriesButton />
      {items.map((item) => (
        <CategoryItem
          key={item.id}
          label={item.name}
          icon={iconMap[item.name]}
          value={item.id}
        />
      ))}
    </div>
  )
}
