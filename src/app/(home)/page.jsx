import Header from "@/component/header/header.jsx";
import "./home.css";
import Footer from "@/component/footer/footer";
import Products from "./products";
import { Suspense } from "react";
import Loading from "./Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
export const metadata = {
  title: "Home page",
  description: "description for Home page",
};
export default function Home() {
  return (
    <>
      <div className="top-img">
        <Header />
        <section className="content">
          <p className="lifestyle">Lifestyle collection</p>
          <p className="men">MEN</p>
          <p className="sale">
            SALE UP TO <span>30% OFF</span>
          </p>
          <p className="free-shipping">
            Get Free Shipping on orders over $99.00
          </p>
          <button>Shop Now</button>
        </section>
      </div>

      <main>
        <h1 style={{ display: "flex" }} className="recommended">
          <FontAwesomeIcon
            className="fa-solid fa-check"
            style={{
              width: "1.5rem",
              marginRight: "0.3rem",
            }}
            icon={faCheck}
          />
          Recommended for you
        </h1>
        <Suspense fallback={<Loading />}>
          <Products />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
