import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_ORDER } from '../utils/mutations';
import { idbPromise } from '../utils/helpers';

//this page will render after the user donates
function Success() {
    const [addOrder] = useMutation(ADD_ORDER);

    useEffect(() => {
        async function saveOrder() {
            const cart = await idbPromise('cart', 'get');
            const products = cart.map((item) =>
                item._id);

            if (products.length) {
                const { data } = await addOrder({
                    variables: {
                        products
                    }
                });
                const productData = data.addOrder.products;
                productData.forEach((item) => {
                    idbPromise('cart', 'delete', item)
                });
            };

            setTimeout(() => {
                window.location.assign('/profile')
            }, 3000);
        }
        saveOrder();
    }, [addOrder]);

    return (
        <div>
            <h1>Success!</h1>
            <h2>Thank You for your donation!</h2>
            <h2>You will be redirected to the home page</h2>
        </div>
    )
}
export default Success;