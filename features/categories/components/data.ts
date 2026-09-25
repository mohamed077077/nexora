export type Category = {
  id: number;
  title: string;
  image: string;
  products: number;
};

const DEFAULT_IMAGE = "https://res.cloudinary.com/dzgwzplze/image/upload/v1789823126/vecteezy_men-s-leisure-leather-shoe-isolated-on-transparent-background_48720410_lvtwor.png";

export const categories: Category[] = [
  {
    id: 1,
    title: "Clothing",
    image: DEFAULT_IMAGE,
    products: 120,
  },
  {
    id: 2,
    title: "Electronics",
    image: DEFAULT_IMAGE,
    products: 45,
  },
  {
    id: 3,
    title: "Furniture",
    image: DEFAULT_IMAGE,
    products: 32,
  },
  {
    id: 4,
    title: "Sports",
    image: DEFAULT_IMAGE,
    products: 89,
  },
  {
    id: 5,
    title: "Laptops",
    image: DEFAULT_IMAGE,
    products: 12,
  },
];