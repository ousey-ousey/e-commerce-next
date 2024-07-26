import "./product-details.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import Header from "@/component/header/header";
import Footer from "@/component/footer/footer";
import { notFound } from "next/navigation";
import Image from "next/image";

async function getData(id) {
  try {
    const res = await fetch(
      `https://prdmgidslzpnltyozjiv.supabase.co/storage/v1/object/sign/jsonfile/db.json?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJqc29uZmlsZS9kYi5qc29uIiwiaWF0IjoxNzIyMDA3ODA3LCJleHAiOjE3NTM1NDM4MDd9.24cxLbDnOjNEAzGqzgbHXvE2rpblD-IbtI_7a8RS7NM&t=2024-07-26T16%3A28%3A27.131Z`
    );

    if (!res.ok) {
      notFound();
    }

    const data = await res.json();
    return data.find((item) => item.id === id) || null;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    notFound();
  }
}

export async function generateMetadata({ params }) {
  const objData = await getData(params.id);
  return {
    title: objData?.title || "Product not found",
    description: objData?.description || "No description available",
  };
}

const Page = async ({ params }) => {
  const objData = await getData(params.id);

  if (!objData) {
    return <div>Product not found</div>;
  }

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
          padding: "30px",
        }}
        className="flex"
      >
        <Image
          alt={objData.title}
          width={1000}
          height={300}
          src={objData.productImg}
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
