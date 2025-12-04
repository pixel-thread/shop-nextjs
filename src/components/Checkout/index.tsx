"use client";
import React, { useCallback, useEffect } from "react";
import Breadcrumb from "../Common/Breadcrumb";
import Login from "./Login";
import Shipping from "./Shipping";
import { useCart } from "@/hooks/cart/useCart";
import { totalProductPrice } from "@/types/totalProductPrice";
import { useAuth } from "@/hooks/auth/useAuth";
import { Ternary } from "../Common/Ternary";
import { Button } from "../ui/button";

const RAZORPAY_KEY_ID = "rzp_test_Rdfa1pxFIC6Fxt";

var options = {
  key: RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
  amount: "50000", // Amount is in currency subunits.
  currency: "INR",
  name: "Acme Corp", //your business name
  description: "Test Transaction",
  image: "https://example.com/your_logo",
  // order_id: "order_9A33XWu170gUtm", // This is a sample Order ID. Pass the `id` obtained in the response of Step 1
  callback_url: "http://localhost:3000/",
  prefill: {
    //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
    name: "Gaurav Kumar", //your customer's name
    email: "gaurav.kumar@example.com",
    contact: "+919876543210", //Provide the customer's phone number for better conversion rates
  },
  notes: {
    address: "Razorpay Corporate Office",
  },
  theme: {
    color: "#3399cc",
  },
};

const Checkout = () => {
  const { user } = useAuth();
  const { cart: cartItems } = useCart();
  return (
    <>
      <Breadcrumb title={"Checkout"} pages={["checkout"]} />
      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex flex-col lg:flex-row gap-7.5 xl:gap-11">
            {/* <!-- checkout left --> */}
            <div className="lg:max-w-[670px] w-full">
              {/* <!-- login box --> */}
              <Ternary condition={!!user} ifTrue={null} ifFalse={<Login />} />

              {/* <!-- billing details --> */}
              {/* <Billing /> */}

              {/* <!-- address box two --> */}
              <Shipping />

              {/* <!-- others note box --> */}
              <div className="bg-white shadow-1 rounded-[10px] p-4 sm:p-8.5 mt-7.5">
                <div>
                  <label htmlFor="notes" className="block mb-2.5">
                    Other Notes (optional)
                  </label>

                  <textarea
                    name="notes"
                    id="notes"
                    rows={5}
                    placeholder="Notes about your order, e.g. speacial notes for delivery."
                    className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full p-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* // <!-- checkout right --> */}
            <div className="max-w-[455px] w-full">
              {/* <!-- order list box --> */}
              <div className="bg-white shadow-1 rounded-[10px]">
                <div className="border-b border-gray-3 py-5 px-4 sm:px-8.5">
                  <h3 className="font-medium text-xl text-dark">Your Order</h3>
                </div>

                <div className="pt-2.5 pb-8.5 px-4 sm:px-8.5">
                  {/* <!-- title --> */}
                  <div className="flex items-center justify-between py-5 border-b border-gray-3">
                    <div>
                      <h4 className="font-medium text-dark">Product</h4>
                    </div>
                    <div>
                      <h4 className="font-medium text-dark text-right">
                        Subtotal
                      </h4>
                    </div>
                  </div>

                  {/* <!-- product item --> */}
                  {cartItems.map((item, key) => (
                    <div
                      key={key}
                      className="flex items-center justify-between py-5 border-b border-gray-3"
                    >
                      <div>
                        <p className="text-dark">
                          {item.title}&nbsp;x&nbsp;{item.quantity}
                        </p>
                      </div>
                      <div>
                        <p className="text-dark text-right">
                          ${item.price * item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}

                  {/* <!-- total --> */}
                  <div className="flex items-center justify-between pt-5">
                    <div>
                      <p className="font-medium text-lg text-dark">Total</p>
                    </div>
                    <div>
                      <p className="font-medium text-lg text-dark text-right">
                        {totalProductPrice(cartItems)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* <!-- coupon box --> */}
              {/* <Coupon /> */}

              {/* <!-- shipping box --> */}
              {/* <ShippingMethod /> */}

              {/* <!-- payment box --> */}
              {/* <PaymentMethod /> */}

              {/* <!-- checkout button --> */}
              <RazorpayButton options={options} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Checkout;

function RazorpayButton({ options, label = "Pay" }) {
  const handlePayment = useCallback(() => {
    const paymentObject = new window.Razorpay(options);
    paymentObject.on("payment.failed", function (response: any) {
      alert(response.error.description);
    });
    paymentObject.open();
  }, [options]);

  return (
    <Button
      variant="default"
      className="w-full mt-2 py-7"
      onClick={handlePayment}
    >
      {label}
    </Button>
  );
}
