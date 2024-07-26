import "./product-details.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import Header from "@/component/header/header";
import Footer from "@/component/footer/footer";
import { notFound } from "next/navigation";
import Image from "next/image";

async function getData(iddd) {
  const res = await fetch(`http://localhost:4000/products/${iddd}`);
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    notFound();
  }

  return res.json();
}
export async function generateMetadata({ params }) {
  const objData = await getData(params.id);
  return {
    title: objData.title,
    description: objData.description,
  };
}
const Page = async ({ params }) => {
  const objData = await getData(params.id);

  return (
    <div
      style={{
        height: "100vh",
        display: "grid",
        alignItems: "center",
        gridTemplateRows: "auto 1fr auto",
      }}
    >
      <Header />

      <main
        style={{
          textAlign: "center",
          flexDirection: "column",
          alignContent: "center",
          justifyContent: "center",
        }}
        className="flex"
      >
        <Image
          alt=""
          width={1000}
          height={300}
          src={`/${objData.productImg}`}
          quality={100}
        />
        <div className="product-details">
          <div style={{ justifyContent: "space-between" }} className="flex">
            <h2>{objData.title}</h2>
            <p className="price">${objData.price}</p>
          </div>
          <p className="description">{objData.description}</p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              style={{
                display: "flex",
                justifyContent: "center",
                width: "200px",
                margin: "9px",
              }}
              className="flex add-to-cart"
            >
              <FontAwesomeIcon style={{ width: "1.1rem" }} icon={faCartPlus} />
              Add To Cart
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Page;
