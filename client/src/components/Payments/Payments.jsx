/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/button-has-type */
/* eslint-disable no-shadow */
/* eslint-disable import/no-extraneous-dependencies */
// import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
// import axios from 'axios';
// import React, { useState } from 'react';

// const CARD_OPTIONS = {
//   iconStyle: 'solid',
//   style: {
//     base: {
//       iconColor: '#c4f0ff',
//       color: '#fff',
//       background: 'black',
//       fontWeight: 700,
//       fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
//       fontSize: '16px',
//       fontSmoothing: 'antialiased',
//     },
//     invalid: {
//       iconColor: 'red',
//       color: 'white',
//     },
//   },
// };

// export default function PaymentForm() {
//   const [confirm, setConfirm] = useState(false);
//   const stripe = useStripe();
//   const elements = useElements();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { error, paymentMethod } = await stripe.createPaymentMethod({
//       type: 'card',
//       card: elements.getElement(CardElement),
//     });

//     if (!error) {
//       try {
//         const { id } = paymentMethod;
//         const response = await axios.post('http://localhost:4000/pay', {
//           amount: 1000,
//           id,
//         });

//         if (response.data.success) {
//           setConfirm(true);
//         }
//       } catch (error) {
//         console.log('Error', error);
//       }
//     } else {
//       console.log(error.message);
//     }
//   };

//   return (
//     <>
//       {!confirm ? (
//         <form onSubmit={handleSubmit}>
//           <fieldset className="FormGroup">
//             <div className="FormRow">
//               <CardElement options={CARD_OPTIONS} />
//             </div>
//           </fieldset>
//           <button>Pay</button>
//         </form>
//       ) : (
//         <div>
//           <h2>Thank You! Enjoy Your Ice-Cream</h2>
//         </div>
//       )}
//     </>
//   );
//   // }
// }

// import React, { useState } from 'react';
// import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// function Payments() {
//   const [paymentSuccess, setPaymentSuccess] = useState(false);
//   const stripe = useStripe();
//   const elements = useElements();
//   const [formData, setFormData] = useState('');

//   const handleChange = (event) => {
//     setFormData({ ...formData, [event.target.name]: event.target.value });
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const { error, paymentMethod } = await stripe.createPaymentMethod({
//       type: 'card',
//       card: elements.getElement(CardElement),
//     });

//     if (!error) {
//       // Send payment method ID to server to complete payment
//       const response = await fetch('http://localhost:4000/payment', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         credentials: 'include',
//         body: JSON.stringify({
//           payment_method_id: paymentMethod.id,
//           amount: formData,
//         }),
//       });
//       console.log(response);
//       if (response.ok) {
//         setPaymentSuccess(true);
//       }
//     }
//   };

//   return (
//     <>
//       <input onChange={handleChange} name="amount"
// type="text" placeholder="Amount" value={formData.amount} />
//       <form onSubmit={handleSubmit}>
//         <CardElement />
//         <button type="submit">Pay</button>
//         {paymentSuccess && <p>Payment successful!</p>}
//       </form>
//     </>
//   );
// }

// export default Payments;

// import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
// import axios from 'axios';
// import React, { useState } from 'react';
// import { useSelector } from 'react-redux';

// const CARD_OPTIONS = {
//   iconStyle: 'solid',
//   style: {
//     base: {
//       iconColor: '#c4f0ff',
//       color: '#fff',
//       fontWeight: 500,
//       fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
//       fontSize: '16px',
//       fontSmoothing: 'antialiased',
//       ':-webkit-autofill': { color: '#fce883' },
//       '::placeholder': { color: '#87bbfd' },
//     },
//     invalid: {
//       iconColor: '#ffc7ee',
//       color: '#ffc7ee',
//     },
//   },
// };

// export default function Payment() {
//   const [success, setSuccess] = useState(false);
//   const stripe = useStripe();
//   const elements = useElements();
//   const [formData, setFormData] = useState('');
//   const user = useSelector((state) => state.profile.user.id);

//   const handleChange = (event) => {
//     setFormData({ ...formData, [event.target.name]: event.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { error, paymentMethod } = await stripe.createPaymentMethod({
//       type: 'card',
//       card: elements.getElement(CardElement),
//     });

//     if (!error) {
//       try {
//         const idPay = paymentMethod.id;
//         const response = await axios.post('http://localhost:4000/payment', {
//           amount: formData,
//           idPay,
//           id: user,

//         });

//         if (response.data.success) {
//           console.log('Successful payment');
//           setSuccess(true);
//         }
//       } catch (error) {
//         console.log('Error', error);
//       }
//     } else {
//       console.log(error.message);
//     }
//   };

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CardElement } from '@stripe/react-stripe-js';

const CARD_OPTIONS = {
  iconStyle: 'solid',
  style: {
    base: {
      iconColor: '#c4f0ff',
      color: '#fff',
      fontWeight: 500,
      fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': { color: '#fce883' },
      '::placeholder': { color: '#87bbfd' },
    },
    invalid: {
      iconColor: '#ffc7ee',
      color: '#ffc7ee',
    },
  },
};

export default function Payments() {
  const [formData, setFormData] = useState('');
  const user = useSelector((state) => state.profile.user.id);
  const navigate = useNavigate();

  const handelChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handelSubmit = () => {
    fetch('http://localhost:4000/payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ formData }),
    });
    window.location.reload();
  };

  return (
    <>
      <input
        onChange={handelChange}
        name="cash"
        type="number"
        placeholder="Cach"
        value={formData.cash}
      />
      {/* <form>
        <fieldset className="FormGroup">
          <div className="FormRow">
            <CardElement style={CARD_OPTIONS} />
          </div>
        </fieldset> */}
      <button type="button" onClick={handelSubmit}>
        Pay
      </button>
      {/* </form> */}
    </>
  );
}
