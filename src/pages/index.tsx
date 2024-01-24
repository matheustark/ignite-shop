"use-client";
import Image from "next/image";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

import { HomeContainer, Product } from "../styles/pages/home";

import { stripe } from "@/lib/stripe";
import { useState } from "react";
import Stripe from "stripe";
import { GetStaticProps } from "next";
import Link from "next/link";

interface PageProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
  }[];
}

export default function Page({ products }: PageProps) {
  const [sliderRef, instanceRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  });
  return (
    <HomeContainer ref={sliderRef}>
      {products.map((product) => (
        <Link key={product.id} href={`/product/${product.id}`}>
          <Product className="keen-slider__slide">
            <Image
              priority
              src={product.imageUrl}
              width={520}
              height={480}
              alt=""
            />

            <footer>
              <strong>{product.name}</strong>
              <span>{product.price}</span>
            </footer>
          </Product>
        </Link>
      ))}
    </HomeContainer>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ["data.default_price"],
  });

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price:
        price.unit_amount &&
        new Intl.NumberFormat("pt-Br", {
          style: "currency",
          currency: "BRL",
        }).format(price.unit_amount / 100),
    };
  });

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2,
  };
};
