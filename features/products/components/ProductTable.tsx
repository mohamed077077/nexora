
"use client";

import Image from "next/image";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";


import { Button } from "@/shared/ui/button";
import ProductPagination from "./ProductPagination";

const products = [
  {
    id: "1",
    title: "Premium Hoodie",
    image: "https://res.cloudinary.com/dzgwzplze/image/upload/v1789823126/vecteezy_men-s-leisure-leather-shoe-isolated-on-transparent-background_48720410_lvtwor.png",
    category: "Hoodies",
    price: 34.99,
    stock: 5,
    orders: 128,
  },
  {
    id: "2",
    title: "Street Low",
    image: "https://res.cloudinary.com/dzgwzplze/image/upload/v1789823126/vecteezy_men-s-leisure-leather-shoe-isolated-on-transparent-background_48720410_lvtwor.png",
    category: "Shoes",
    price: 129.99,
    stock: 12,
    orders: 89,
  },
  {
    id: "3",
    title: "Runner Pro",
    image: "https://res.cloudinary.com/dzgwzplze/image/upload/v1789823126/vecteezy_men-s-leisure-leather-shoe-isolated-on-transparent-background_48720410_lvtwor.png",
    category: "Shoes",
    price: 69.99,
    stock: 31,
    orders: 64,
  },  {
    id: "4",
    title: "Premium Hoodie",
    image: "https://res.cloudinary.com/dzgwzplze/image/upload/v1789823126/vecteezy_men-s-leisure-leather-shoe-isolated-on-transparent-background_48720410_lvtwor.png",
    category: "Hoodies",
    price: 34.99,
    stock: 5,
    orders: 128,
  },
  {
    id: "5",
    title: "Street Low",
    image: "https://res.cloudinary.com/dzgwzplze/image/upload/v1789823126/vecteezy_men-s-leisure-leather-shoe-isolated-on-transparent-background_48720410_lvtwor.png",
    category: "Shoes",
    price: 129.99,
    stock: 12,
    orders: 89,
  },
  {
    id: "6",
    title: "Runner Pro",
    image: "https://res.cloudinary.com/dzgwzplze/image/upload/v1789823126/vecteezy_men-s-leisure-leather-shoe-isolated-on-transparent-background_48720410_lvtwor.png",
    category: "Shoes",
    price: 69.99,
    stock: 31,
    orders: 64,
  },  {
    id: "1",
    title: "Premium Hoodie",
    image: "https://res.cloudinary.com/dzgwzplze/image/upload/v1789823126/vecteezy_men-s-leisure-leather-shoe-isolated-on-transparent-background_48720410_lvtwor.png",
    category: "Hoodies",
    price: 34.99,
    stock: 5,
    orders: 128,
  },
  {
    id: "2",
    title: "Street Low",
    image: "https://res.cloudinary.com/dzgwzplze/image/upload/v1789823126/vecteezy_men-s-leisure-leather-shoe-isolated-on-transparent-background_48720410_lvtwor.png",
    category: "Shoes",
    price: 129.99,
    stock: 12,
    orders: 89,
  },
  {
    id: "3",
    title: "Runner Pro",
    image: "https://res.cloudinary.com/dzgwzplze/image/upload/v1789823126/vecteezy_men-s-leisure-leather-shoe-isolated-on-transparent-background_48720410_lvtwor.png",
    category: "Shoes",
    price: 69.99,
    stock: 31,
    orders: 64,
  },  {
    id: "4",
    title: "Premium Hoodie",
    image: "https://res.cloudinary.com/dzgwzplze/image/upload/v1789823126/vecteezy_men-s-leisure-leather-shoe-isolated-on-transparent-background_48720410_lvtwor.png",
    category: "Hoodies",
    price: 34.99,
    stock: 5,
    orders: 128,
  },
  {
    id: "5",
    title: "Street Low",
    image: "https://res.cloudinary.com/dzgwzplze/image/upload/v1789823126/vecteezy_men-s-leisure-leather-shoe-isolated-on-transparent-background_48720410_lvtwor.png",
    category: "Shoes",
    price: 129.99,
    stock: 12,
    orders: 89,
  },
  {
    id: "6",
    title: "Runner Pro",
    image: "https://res.cloudinary.com/dzgwzplze/image/upload/v1789823126/vecteezy_men-s-leisure-leather-shoe-isolated-on-transparent-background_48720410_lvtwor.png",
    category: "Shoes",
    price: 69.99,
    stock: 31,
    orders: 64,
  },  {
    id: "1",
    title: "Premium Hoodie",
    image: "https://res.cloudinary.com/dzgwzplze/image/upload/v1789823126/vecteezy_men-s-leisure-leather-shoe-isolated-on-transparent-background_48720410_lvtwor.png",
    category: "Hoodies",
    price: 34.99,
    stock: 5,
    orders: 128,
  },
  {
    id: "2",
    title: "Street Low",
    image: "https://res.cloudinary.com/dzgwzplze/image/upload/v1789823126/vecteezy_men-s-leisure-leather-shoe-isolated-on-transparent-background_48720410_lvtwor.png",
    category: "Shoes",
    price: 129.99,
    stock: 12,
    orders: 89,
  },
  {
    id: "3",
    title: "Runner Pro",
    image: "https://res.cloudinary.com/dzgwzplze/image/upload/v1789823126/vecteezy_men-s-leisure-leather-shoe-isolated-on-transparent-background_48720410_lvtwor.png",
    category: "Shoes",
    price: 69.99,
    stock: 31,
    orders: 64,
  },  {
    id: "4",
    title: "Premium Hoodie",
    image: "https://res.cloudinary.com/dzgwzplze/image/upload/v1789823126/vecteezy_men-s-leisure-leather-shoe-isolated-on-transparent-background_48720410_lvtwor.png",
    category: "Hoodies",
    price: 34.99,
    stock: 5,
    orders: 128,
  },
  {
    id: "5",
    title: "Street Low",
    image: "https://res.cloudinary.com/dzgwzplze/image/upload/v1789823126/vecteezy_men-s-leisure-leather-shoe-isolated-on-transparent-background_48720410_lvtwor.png",
    category: "Shoes",
    price: 129.99,
    stock: 12,
    orders: 89,
  },
  {
    id: "6",
    title: "Runner Pro",
    image: "https://res.cloudinary.com/dzgwzplze/image/upload/v1789823126/vecteezy_men-s-leisure-leather-shoe-isolated-on-transparent-background_48720410_lvtwor.png",
    category: "Shoes",
    price: 69.99,
    stock: 31,
    orders: 64,
  },  {
    id: "1",
    title: "Premium Hoodie",
    image: "https://res.cloudinary.com/dzgwzplze/image/upload/v1789823126/vecteezy_men-s-leisure-leather-shoe-isolated-on-transparent-background_48720410_lvtwor.png",
    category: "Hoodies",
    price: 34.99,
    stock: 5,
    orders: 128,
  },
  {
    id: "2",
    title: "Street Low",
    image: "https://res.cloudinary.com/dzgwzplze/image/upload/v1789823126/vecteezy_men-s-leisure-leather-shoe-isolated-on-transparent-background_48720410_lvtwor.png",
    category: "Shoes",
    price: 129.99,
    stock: 12,
    orders: 89,
  },
  {
    id: "3",
    title: "Runner Pro",
    image: "https://res.cloudinary.com/dzgwzplze/image/upload/v1789823126/vecteezy_men-s-leisure-leather-shoe-isolated-on-transparent-background_48720410_lvtwor.png",
    category: "Shoes",
    price: 69.99,
    stock: 31,
    orders: 64,
  },  {
    id: "4",
    title: "Premium Hoodie",
    image: "https://res.cloudinary.com/dzgwzplze/image/upload/v1789823126/vecteezy_men-s-leisure-leather-shoe-isolated-on-transparent-background_48720410_lvtwor.png",
    category: "Hoodies",
    price: 34.99,
    stock: 5,
    orders: 128,
  },
  {
    id: "5",
    title: "Street Low",
    image: "https://res.cloudinary.com/dzgwzplze/image/upload/v1789823126/vecteezy_men-s-leisure-leather-shoe-isolated-on-transparent-background_48720410_lvtwor.png",
    category: "Shoes",
    price: 129.99,
    stock: 12,
    orders: 89,
  },
  {
    id: "6",
    title: "Runner Pro",
    image: "https://res.cloudinary.com/dzgwzplze/image/upload/v1789823126/vecteezy_men-s-leisure-leather-shoe-isolated-on-transparent-background_48720410_lvtwor.png",
    category: "Shoes",
    price: 69.99,
    stock: 31,
    orders: 64,
  },  {
    id: "1",
    title: "Premium Hoodie",
    image: "https://res.cloudinary.com/dzgwzplze/image/upload/v1789823126/vecteezy_men-s-leisure-leather-shoe-isolated-on-transparent-background_48720410_lvtwor.png",
    category: "Hoodies",
    price: 34.99,
    stock: 5,
    orders: 128,
  },
  {
    id: "2",
    title: "Street Low",
    image: "https://res.cloudinary.com/dzgwzplze/image/upload/v1789823126/vecteezy_men-s-leisure-leather-shoe-isolated-on-transparent-background_48720410_lvtwor.png",
    category: "Shoes",
    price: 129.99,
    stock: 12,
    orders: 89,
  },
  {
    id: "3",
    title: "Runner Pro",
    image: "https://res.cloudinary.com/dzgwzplze/image/upload/v1789823126/vecteezy_men-s-leisure-leather-shoe-isolated-on-transparent-background_48720410_lvtwor.png",
    category: "Shoes",
    price: 69.99,
    stock: 31,
    orders: 64,
  },  {
    id: "4",
    title: "Premium Hoodie",
    image: "https://res.cloudinary.com/dzgwzplze/image/upload/v1789823126/vecteezy_men-s-leisure-leather-shoe-isolated-on-transparent-background_48720410_lvtwor.png",
    category: "Hoodies",
    price: 34.99,
    stock: 5,
    orders: 128,
  },
  {
    id: "5",
    title: "Street Low",
    image: "https://res.cloudinary.com/dzgwzplze/image/upload/v1789823126/vecteezy_men-s-leisure-leather-shoe-isolated-on-transparent-background_48720410_lvtwor.png",
    category: "Shoes",
    price: 129.99,
    stock: 12,
    orders: 89,
  },
  {
    id: "6",
    title: "Runner Pro",
    image: "https://res.cloudinary.com/dzgwzplze/image/upload/v1789823126/vecteezy_men-s-leisure-leather-shoe-isolated-on-transparent-background_48720410_lvtwor.png",
    category: "Shoes",
    price: 69.99,
    stock: 31,
    orders: 64,
  },  {
    id: "1",
    title: "Premium Hoodie",
    image: "https://res.cloudinary.com/dzgwzplze/image/upload/v1789823126/vecteezy_men-s-leisure-leather-shoe-isolated-on-transparent-background_48720410_lvtwor.png",
    category: "Hoodies",
    price: 34.99,
    stock: 5,
    orders: 128,
  },
  {
    id: "2",
    title: "Street Low",
    image: "https://res.cloudinary.com/dzgwzplze/image/upload/v1789823126/vecteezy_men-s-leisure-leather-shoe-isolated-on-transparent-background_48720410_lvtwor.png",
    category: "Shoes",
    price: 129.99,
    stock: 12,
    orders: 89,
  },
  {
    id: "3",
    title: "Runner Pro",
    image: "https://res.cloudinary.com/dzgwzplze/image/upload/v1789823126/vecteezy_men-s-leisure-leather-shoe-isolated-on-transparent-background_48720410_lvtwor.png",
    category: "Shoes",
    price: 69.99,
    stock: 31,
    orders: 64,
  },  {
    id: "4",
    title: "Premium Hoodie",
    image: "https://res.cloudinary.com/dzgwzplze/image/upload/v1789823126/vecteezy_men-s-leisure-leather-shoe-isolated-on-transparent-background_48720410_lvtwor.png",
    category: "Hoodies",
    price: 34.99,
    stock: 5,
    orders: 128,
  },
  {
    id: "5",
    title: "Street Low",
    image: "https://res.cloudinary.com/dzgwzplze/image/upload/v1789823126/vecteezy_men-s-leisure-leather-shoe-isolated-on-transparent-background_48720410_lvtwor.png",
    category: "Shoes",
    price: 129.99,
    stock: 12,
    orders: 89,
  },
  {
    id: "6",
    title: "Runner Pro",
    image: "https://res.cloudinary.com/dzgwzplze/image/upload/v1789823126/vecteezy_men-s-leisure-leather-shoe-isolated-on-transparent-background_48720410_lvtwor.png",
    category: "Shoes",
    price: 69.99,
    stock: 31,
    orders: 64,
  },  {
    id: "1",
    title: "Premium Hoodie",
    image: "https://res.cloudinary.com/dzgwzplze/image/upload/v1789823126/vecteezy_men-s-leisure-leather-shoe-isolated-on-transparent-background_48720410_lvtwor.png",
    category: "Hoodies",
    price: 34.99,
    stock: 5,
    orders: 128,
  },
  {
    id: "2",
    title: "Street Low",
    image: "https://res.cloudinary.com/dzgwzplze/image/upload/v1789823126/vecteezy_men-s-leisure-leather-shoe-isolated-on-transparent-background_48720410_lvtwor.png",
    category: "Shoes",
    price: 129.99,
    stock: 12,
    orders: 89,
  },
  {
    id: "3",
    title: "Runner Pro",
    image: "https://res.cloudinary.com/dzgwzplze/image/upload/v1789823126/vecteezy_men-s-leisure-leather-shoe-isolated-on-transparent-background_48720410_lvtwor.png",
    category: "Shoes",
    price: 69.99,
    stock: 31,
    orders: 64,
  },  {
    id: "4",
    title: "Premium Hoodie",
    image: "https://res.cloudinary.com/dzgwzplze/image/upload/v1789823126/vecteezy_men-s-leisure-leather-shoe-isolated-on-transparent-background_48720410_lvtwor.png",
    category: "Hoodies",
    price: 34.99,
    stock: 5,
    orders: 128,
  },
  {
    id: "5",
    title: "Street Low",
    image: "https://res.cloudinary.com/dzgwzplze/image/upload/v1789823126/vecteezy_men-s-leisure-leather-shoe-isolated-on-transparent-background_48720410_lvtwor.png",
    category: "Shoes",
    price: 129.99,
    stock: 12,
    orders: 89,
  },
  {
    id: "6",
    title: "Runner Pro",
    image: "https://res.cloudinary.com/dzgwzplze/image/upload/v1789823126/vecteezy_men-s-leisure-leather-shoe-isolated-on-transparent-background_48720410_lvtwor.png",
    category: "Shoes",
    price: 69.99,
    stock: 31,
    orders: 64,
  },  {
    id: "1",
    title: "Premium Hoodie",
    image: "https://res.cloudinary.com/dzgwzplze/image/upload/v1789823126/vecteezy_men-s-leisure-leather-shoe-isolated-on-transparent-background_48720410_lvtwor.png",
    category: "Hoodies",
    price: 34.99,
    stock: 5,
    orders: 128,
  },
  {
    id: "2",
    title: "Street Low",
    image: "https://res.cloudinary.com/dzgwzplze/image/upload/v1789823126/vecteezy_men-s-leisure-leather-shoe-isolated-on-transparent-background_48720410_lvtwor.png",
    category: "Shoes",
    price: 129.99,
    stock: 12,
    orders: 89,
  },
  {
    id: "3",
    title: "Runner Pro",
    image: "https://res.cloudinary.com/dzgwzplze/image/upload/v1789823126/vecteezy_men-s-leisure-leather-shoe-isolated-on-transparent-background_48720410_lvtwor.png",
    category: "Shoes",
    price: 69.99,
    stock: 31,
    orders: 64,
  },  {
    id: "4",
    title: "Premium Hoodie",
    image: "https://res.cloudinary.com/dzgwzplze/image/upload/v1789823126/vecteezy_men-s-leisure-leather-shoe-isolated-on-transparent-background_48720410_lvtwor.png",
    category: "Hoodies",
    price: 34.99,
    stock: 5,
    orders: 128,
  },
  {
    id: "5",
    title: "Street Low",
    image: "https://res.cloudinary.com/dzgwzplze/image/upload/v1789823126/vecteezy_men-s-leisure-leather-shoe-isolated-on-transparent-background_48720410_lvtwor.png",
    category: "Shoes",
    price: 129.99,
    stock: 12,
    orders: 89,
  },
  {
    id: "6",
    title: "Runner Pro",
    image: "https://res.cloudinary.com/dzgwzplze/image/upload/v1789823126/vecteezy_men-s-leisure-leather-shoe-isolated-on-transparent-background_48720410_lvtwor.png",
    category: "Shoes",
    price: 69.99,
    stock: 31,
    orders: 64,
  },  {
    id: "1",
    title: "Premium Hoodie",
    image: "https://res.cloudinary.com/dzgwzplze/image/upload/v1789823126/vecteezy_men-s-leisure-leather-shoe-isolated-on-transparent-background_48720410_lvtwor.png",
    category: "Hoodies",
    price: 34.99,
    stock: 5,
    orders: 128,
  },
  {
    id: "2",
    title: "Street Low",
    image: "https://res.cloudinary.com/dzgwzplze/image/upload/v1789823126/vecteezy_men-s-leisure-leather-shoe-isolated-on-transparent-background_48720410_lvtwor.png",
    category: "Shoes",
    price: 129.99,
    stock: 12,
    orders: 89,
  },
  {
    id: "3",
    title: "Runner Pro",
    image: "https://res.cloudinary.com/dzgwzplze/image/upload/v1789823126/vecteezy_men-s-leisure-leather-shoe-isolated-on-transparent-background_48720410_lvtwor.png",
    category: "Shoes",
    price: 69.99,
    stock: 31,
    orders: 64,
  },  {
    id: "4",
    title: "Premium Hoodie",
    image: "https://res.cloudinary.com/dzgwzplze/image/upload/v1789823126/vecteezy_men-s-leisure-leather-shoe-isolated-on-transparent-background_48720410_lvtwor.png",
    category: "Hoodies",
    price: 34.99,
    stock: 5,
    orders: 128,
  },
  {
    id: "5",
    title: "Street Low",
    image: "https://res.cloudinary.com/dzgwzplze/image/upload/v1789823126/vecteezy_men-s-leisure-leather-shoe-isolated-on-transparent-background_48720410_lvtwor.png",
    category: "Shoes",
    price: 129.99,
    stock: 12,
    orders: 89,
  },
  {
    id: "6",
    title: "Runner Pro",
    image: "https://res.cloudinary.com/dzgwzplze/image/upload/v1789823126/vecteezy_men-s-leisure-leather-shoe-isolated-on-transparent-background_48720410_lvtwor.png",
    category: "Shoes",
    price: 69.99,
    stock: 31,
    orders: 64,
  },  {
    id: "1",
    title: "Premium Hoodie",
    image: "https://res.cloudinary.com/dzgwzplze/image/upload/v1789823126/vecteezy_men-s-leisure-leather-shoe-isolated-on-transparent-background_48720410_lvtwor.png",
    category: "Hoodies",
    price: 34.99,
    stock: 5,
    orders: 128,
  },
  {
    id: "2",
    title: "Street Low",
    image: "https://res.cloudinary.com/dzgwzplze/image/upload/v1789823126/vecteezy_men-s-leisure-leather-shoe-isolated-on-transparent-background_48720410_lvtwor.png",
    category: "Shoes",
    price: 129.99,
    stock: 12,
    orders: 89,
  },
  {
    id: "3",
    title: "Runner Pro",
    image: "https://res.cloudinary.com/dzgwzplze/image/upload/v1789823126/vecteezy_men-s-leisure-leather-shoe-isolated-on-transparent-background_48720410_lvtwor.png",
    category: "Shoes",
    price: 69.99,
    stock: 31,
    orders: 64,
  },  {
    id: "4",
    title: "Premium Hoodie",
    image: "https://res.cloudinary.com/dzgwzplze/image/upload/v1789823126/vecteezy_men-s-leisure-leather-shoe-isolated-on-transparent-background_48720410_lvtwor.png",
    category: "Hoodies",
    price: 34.99,
    stock: 5,
    orders: 128,
  },
  {
    id: "5",
    title: "Street Low",
    image: "https://res.cloudinary.com/dzgwzplze/image/upload/v1789823126/vecteezy_men-s-leisure-leather-shoe-isolated-on-transparent-background_48720410_lvtwor.png",
    category: "Shoes",
    price: 129.99,
    stock: 12,
    orders: 89,
  },
  {
    id: "6",
    title: "Runner Pro",
    image: "https://res.cloudinary.com/dzgwzplze/image/upload/v1789823126/vecteezy_men-s-leisure-leather-shoe-isolated-on-transparent-background_48720410_lvtwor.png",
    category: "Shoes",
    price: 69.99,
    stock: 31,
    orders: 64,
  },  {
    id: "1",
    title: "Premium Hoodie",
    image: "https://res.cloudinary.com/dzgwzplze/image/upload/v1789823126/vecteezy_men-s-leisure-leather-shoe-isolated-on-transparent-background_48720410_lvtwor.png",
    category: "Hoodies",
    price: 34.99,
    stock: 5,
    orders: 128,
  },
  {
    id: "2",
    title: "Street Low",
    image: "https://res.cloudinary.com/dzgwzplze/image/upload/v1789823126/vecteezy_men-s-leisure-leather-shoe-isolated-on-transparent-background_48720410_lvtwor.png",
    category: "Shoes",
    price: 129.99,
    stock: 12,
    orders: 89,
  },
  {
    id: "3",
    title: "Runner Pro",
    image: "https://res.cloudinary.com/dzgwzplze/image/upload/v1789823126/vecteezy_men-s-leisure-leather-shoe-isolated-on-transparent-background_48720410_lvtwor.png",
    category: "Shoes",
    price: 69.99,
    stock: 31,
    orders: 64,
  },  {
    id: "4",
    title: "Premium Hoodie",
    image: "https://res.cloudinary.com/dzgwzplze/image/upload/v1789823126/vecteezy_men-s-leisure-leather-shoe-isolated-on-transparent-background_48720410_lvtwor.png",
    category: "Hoodies",
    price: 34.99,
    stock: 5,
    orders: 128,
  },
  {
    id: "5",
    title: "Street Low",
    image: "https://res.cloudinary.com/dzgwzplze/image/upload/v1789823126/vecteezy_men-s-leisure-leather-shoe-isolated-on-transparent-background_48720410_lvtwor.png",
    category: "Shoes",
    price: 129.99,
    stock: 12,
    orders: 89,
  },
  {
    id: "6",
    title: "Runner Pro",
    image: "https://res.cloudinary.com/dzgwzplze/image/upload/v1789823126/vecteezy_men-s-leisure-leather-shoe-isolated-on-transparent-background_48720410_lvtwor.png",
    category: "Shoes",
    price: 69.99,
    stock: 31,
    orders: 64,
  },  {
    id: "1",
    title: "Premium Hoodie",
    image: "https://res.cloudinary.com/dzgwzplze/image/upload/v1789823126/vecteezy_men-s-leisure-leather-shoe-isolated-on-transparent-background_48720410_lvtwor.png",
    category: "Hoodies",
    price: 34.99,
    stock: 5,
    orders: 128,
  },
  {
    id: "2",
    title: "Street Low",
    image: "https://res.cloudinary.com/dzgwzplze/image/upload/v1789823126/vecteezy_men-s-leisure-leather-shoe-isolated-on-transparent-background_48720410_lvtwor.png",
    category: "Shoes",
    price: 129.99,
    stock: 12,
    orders: 89,
  },
  {
    id: "3",
    title: "Runner Pro",
    image: "https://res.cloudinary.com/dzgwzplze/image/upload/v1789823126/vecteezy_men-s-leisure-leather-shoe-isolated-on-transparent-background_48720410_lvtwor.png",
    category: "Shoes",
    price: 69.99,
    stock: 31,
    orders: 64,
  },  {
    id: "4",
    title: "Premium Hoodie",
    image: "https://res.cloudinary.com/dzgwzplze/image/upload/v1789823126/vecteezy_men-s-leisure-leather-shoe-isolated-on-transparent-background_48720410_lvtwor.png",
    category: "Hoodies",
    price: 34.99,
    stock: 5,
    orders: 128,
  },
  {
    id: "5",
    title: "Street Low",
    image: "https://res.cloudinary.com/dzgwzplze/image/upload/v1789823126/vecteezy_men-s-leisure-leather-shoe-isolated-on-transparent-background_48720410_lvtwor.png",
    category: "Shoes",
    price: 129.99,
    stock: 12,
    orders: 89,
  },
  {
    id: "6",
    title: "Runner Pro",
    image: "https://res.cloudinary.com/dzgwzplze/image/upload/v1789823126/vecteezy_men-s-leisure-leather-shoe-isolated-on-transparent-background_48720410_lvtwor.png",
    category: "Shoes",
    price: 69.99,
    stock: 31,
    orders: 64,
  },


];

export default function ProductTable() {
  
const [currentPage, setCurrentPage] = useState(1);

const productsPerPage = 3;

const totalPages = Math.ceil(products.length / productsPerPage);


const startIndex = (currentPage - 1) * productsPerPage;

const currentProducts = products.slice(
  startIndex,
  startIndex + productsPerPage
);
  return (
    <div className="w-full overflow-auto rounded-2xl border border-border">
      <Table>
        <TableHeader className="bg-card ">
          <TableRow className="border-0  h-16  border-b border-border last:border-b-0 hover:bg-transparent">
            <TableHead className="table-head-cell">
              Image
            </TableHead>

            <TableHead className="table-head-cell">
              Product
            </TableHead>

            <TableHead className="table-head-cell">
              Category
            </TableHead>

            <TableHead className="table-head-cell">
              Price
            </TableHead>

            <TableHead className="table-head-cell">
              Stock
            </TableHead>

            <TableHead className="table-head-cell">
              Orders
            </TableHead>

            <TableHead className="table-head-cell">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {currentProducts.map((product) => (
            <TableRow className="border-0 border-b border-border last:border-b-0 hover:bg-transparent px-5 py-4"
              key={product.id}
            >
              {/* Product Image */}
              <TableCell className="px-5 py-4">
                <div className="relative size-20 overflow-hidden rounded-xl bg-card">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    sizes="80px"
                    className="object-contain p-1  size-24   hover:scale-110 transition-transform cursor-pointer"
                  />
                </div>
              </TableCell>

              {/* Product Name */}
              <TableCell>
                <span className="table-text">
                  {product.title}
                </span>
              </TableCell>

              {/* Category */}
              <TableCell className="table-text">
                {product.category}
              </TableCell>

              {/* Price */}
              <TableCell className="table-text">
                ${product.price.toFixed(2)}
              </TableCell>

              {/* Stock */}
              <TableCell className={`font-medium text-base  ${product.stock < 10 ? 'text-destructive' : product.stock > 20 ? 'text-success' : 'text-primary'
                }`}>
                {product.stock}
              </TableCell>

              {/* Orders */}
              <TableCell className="table-text">
                {product.orders}
              </TableCell>

              {/* Actions */}
              <TableCell>
                <div className="flex items-center justify-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    className="size-11  bg-background  icon-hover hover:text-foreground/70"
                    aria-label={`Edit ${product.title}`}
                  >
                    <Pencil className="size-5" />
                  </Button>

                  <Button
                    variant="outline"
                    size="icon"
                    className="size-11  bg-background text-destructive icon-hover hover:text-destructive/70 "
                    aria-label={`Delete ${product.title}`}
                  >
                    <Trash2 className="size-5" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex w-full h-16 items-center justify-between border-t border-border px-5">
        <p className="text-sm text-muted-foreground">
          {products.length} products
        </p>

  <ProductPagination
    currentPage={currentPage}
    totalPages={totalPages}
    onPageChange={setCurrentPage}
  />
</div>
    </div>
  );
}