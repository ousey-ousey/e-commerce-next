import React from "react";
import "./home.css";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

async function getData() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const res = await fetch("http://localhost:4000/products", {
    next: { revalidate: 0 },
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    notFound();
  }

  return res.json();
}
const Products = async () => {
  const arraydata = await getData();
  return (
    <section className="products flex">
      {arraydata.map((item) => {
        return (
          <article title={item.title} key={item.id} className="card">
            <Link href={`/product-details/${item.id}`}>
              <Image
                width={266}
                height={250}
                src={"/" + item.productImg}
                alt=""
              />
            </Link>
            <div style={{ width: "266px" }} className="content">
              <h1 className="title">{item.title}...</h1>
              <p className="description" height={300}>
                {item.description.slice(0, 100)}...
              </p>
              <div
                className="flex"
                style={{
                  justifyContent: "space-between",
                  paddingBottom: "0.7rem",
                }}
              >
                <div className="price">${item.price}</div>
                <button className="flex add-to-cart">
                  <FontAwesomeIcon
                    style={{ width: "1.1rem" }}
                    icon={faCartPlus}
                  />
                  Add To Cart
                </button>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
};

export default Products;
