"use-client";
import { useRouter } from "next/router";
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from "../../styles/pages/product";

export default function Product() {
  const { query } = useRouter();

  return (
    <ProductContainer>
      <ImageContainer></ImageContainer>

      <ProductDetails>
        <h1>Camiseta x</h1>
        <span>77,90 R$</span>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          reprehenderit? Laboriosam voluptatem necessitatibus magni architecto
          illum!
        </p>
        <button>Comprar agora</button>
      </ProductDetails>
    </ProductContainer>
  );
}
