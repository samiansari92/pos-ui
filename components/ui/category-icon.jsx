import {
  Salad, UtensilsCrossed, Wheat, ChefHat, IceCream,
  Coffee, Package, Soup, Flame, Leaf, Star, Heart,
  Pizza, Fish, Beef, Egg, Cookie, Wine
} from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap = {
  Salad, UtensilsCrossed, Wheat, ChefHat, IceCream,
  Cup: Coffee, Package, Soup, Flame, Leaf, Star, Heart,
  Pizza, Fish, Beef, Egg, Cookie, Wine, Coffee,
};

export function CategoryIcon({ name, className }) {
  const Icon = iconMap[name] || UtensilsCrossed;
  return <Icon className={cn("h-4 w-4", className)} />;
}
