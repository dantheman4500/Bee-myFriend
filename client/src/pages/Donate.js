
import { Button, Stack} from '@chakra-ui/react';
import { Link } from 'react-router-dom'
import "./styles.css"
import { useLazyQuery } from '@apollo/client';
import { QUERY_CHECKOUT } from '../utils/queries';
import React, { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');



const Donate = () => {
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  useEffect(() => {
    if(data) {
      console.log("WE got back from backend!");
      console.log(data);
      console.log(data.checkout.session);
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
}, [data]);

function submitCheckout(amount) {
  // pass the right products as variables to getCheckout
    const products =[];

    const product = {
      name: `${amount} dollars`,
      description: `${amount} dollars donation!`,
      price: amount
    }
    products.push(product);

    console.log(products);
    
    getCheckout({
        variables: { products },
    });
}

  return (
<div>
<Link className='backButton' to="/profile"><Button className='btn' backgroundColor='orange.300' >← Back</Button></Link>
<Stack spacing={4} direction='row' align='center' size='md'>
  <Button  onClick={ ()=>submitCheckout(5)} className='btn' backgroundColor='orange.300' size='lg'>$5.00</Button>
  <Button onClick={ ()=>submitCheckout(10)} className='btn' backgroundColor='orange.300' size='lg'>$10.00</Button>
  <Button onClick={ ()=>submitCheckout(20)} className='btn' backgroundColor='orange.300' size='lg'>$20.00</Button>
  <Button onClick={ ()=>submitCheckout(100)} className='btn' backgroundColor='orange.300' size='lg'>$100.00</Button>
  
</Stack>
</div>
)}
export default Donate;