"use client";

import { useState, useEffect } from "react";
import Table from "../../components/Table";
import { useAuth } from "../../context/AuthContext";
import db from "../../config/firebase";
import { productsModel } from "utils/productsModel";
import { loadStripe } from "@stripe/stripe-js";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(
    "price_1NgkmrSEnJyY7NsxwHyVBxe0"
  );
  const [selectedInterval, setSelectedInterval] = useState("Monthly");
  const [isBillingLoading, setIsBillingLoading] = useState(false);
  const { user } = useAuth();
  const [subscription, setSubscription] = useState(null);
  useEffect(() => {
    db.collectionGroup("prices")
      .where("active", "==", true)
      .get()
      .then((querySnapshot) => {
        const productsx = [];
        querySnapshot.forEach((productDoc) => {
          productsx.push({
            id: productDoc.id,
            data: productDoc.data(),
          });
        });
        setProducts(productsx);
      });
  }, []);
  // products.map((product) => {
  //     console.log(product)
  // })
  products.forEach((product) => {
    console.log(product);
  });

  const loadCheckout = async (priceId) => {
    const docRef = await db
      .collection("customers")
      .doc(user.uid)
      .collection("checkout_sessions")
      .add({
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      });
    docRef.onSnapshot(async (snap) => {
      const { error, sessionId } = snap.data();
      if (error) {
        // Show error to your customer and
        // inspect your cloud funtion logs in Firebase console
        alert(`An error occured: ${error.message}`);
      }

      if (sessionId) {
        // We have a session, let's redirect to checkout
        // Init Stripe

        const stripe = await loadStripe(
          "pk_test_51NghWISEnJyY7Nsx5e9ixesaxVRnBkOlXe4p4UzZ3aIiXL5TZfzdT9nS7BRuGC7ylHXn3g3MvXP93imZFE4RZKE100M8jogzy4"
        );
        stripe.redirectToCheckout({ sessionId });
      }
    });
  };
  // console.log(products)
  return (
    <main className="mx-auto max-w-5xl px-5 pt-28 pb-12 transition-all md:px-10">
      <h1 className="mb-10 text-3xl font-medium">
        Choose the right plan for you
      </h1>

      <div className="mt-4 flex flex-col space-y-4">
        <div className="flex w-full items-center justify-between ">
          <div className="flex gap-3 bg-[#204d91] h-16 p-2 rounded-full w-44 text-white items-center justify-center">
            <button
              className={
                selectedInterval == "Monthly"
                  ? "bg-white text-[#204d91] font-bold rounded-full p-2"
                  : ""
              }
              onClick={() => setSelectedInterval("Monthly")}
            >
              Monthly
            </button>
            <button
              className={
                selectedInterval == "Yearly"
                  ? "bg-white text-[#204d91] font-bold rounded-full p-2"
                  : ""
              }
              onClick={() => setSelectedInterval("Yearly")}
            >
              Yearly
            </button>
          </div>
          <div className="flex w-full items-center justify-end self-end md:w-3/5">
            {productsModel.map((product) => (
              <div
                onClick={() => {
                  selectedInterval === "Monthly"
                    ? setSelectedPlan(product.id.monthly)
                    : setSelectedPlan(product.id.yearly);
                }}
                className={`planBox ${
                  selectedPlan === product.id.monthly ||
                  selectedPlan === product.id.yearly
                    ? "opacity-100 text-blue"
                    : "opacity-60"
                }`}
                key={product.index}
                // onClick={() => setSelectedPlan(product)}
              >
                {product.name}
              </div>
            ))}
          </div>
        </div>

        <Table
          products={products}
          selectedPlan={selectedPlan}
          selectedInterval={selectedInterval}
        />

        <button
          disabled={!selectedPlan || isBillingLoading}
          className={`mx-auto w-11/12 rounded bg-[#204d91] text-white py-4 text-xl shadow  md:w-[420px] ${
            isBillingLoading && "opacity-60"
          } ${!selectedPlan && "opacity:40 bg-gray-300"}`}
          onClick={() => loadCheckout(selectedPlan)}
        >
          {isBillingLoading ? <p>Loading</p> : "Next"}
        </button>
      </div>
    </main>
  );
}
