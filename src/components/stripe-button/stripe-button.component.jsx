import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price }) => {
  //note stripe needs price in cents
  const priceForStripe = price * 100;
  const publishableKey = "pk_test_iO70lHlfuFiFAJ3rXzodS02G00v3T2xjGf";

  const onToken = token => {
    console.log(token);
    //where instead of console log we will pass token to the backend, but this is an example so im not processing the payment
    alert("Payment Successful");
  };

  //StripeCheckout property's https://github.com/azmenak/react-stripe-checkout
  return (
    <StripeCheckout
      label="Pay Now"
      name="CRWN Clothing Ltd."
      billingAddress
      shippingAddress
      image="https://sendeyo.com/up/d/f3eb2117da"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
