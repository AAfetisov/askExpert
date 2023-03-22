/* eslint-disable import/no-extraneous-dependencies */
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import Payments from './Payments';

const PUBLIC_KEY = 'pk_test_51MnpLGEaS26Uz7He9FEeENsnpd33uLttVSpQKsDb1iE5l6AmafKRvSTzVoTYkFEtjMjCjfCgDOkEYEXSUI6aXfbE00SbTa2zTl';

const stripeTestPromise = loadStripe(PUBLIC_KEY);

export default function StripeContainer() {
  return (
    <Elements stripe={stripeTestPromise}>
      <Payments />
    </Elements>
  );
}
