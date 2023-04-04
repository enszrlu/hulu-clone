import React, { useEffect } from 'react';
import { useState } from 'react';
import db from '../../firebase';
import { collection, query, where, getDocs, addDoc, onSnapshot, doc } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/userSlice';
import { loadStripe } from '@stripe/stripe-js';

function PlansScreen() {
    const [plans, setPlans] = useState([]);
    const [subscription, setSubscription] = useState(null);

    const colRef = collection(db, 'products');
    const q = query(colRef, where('active', '==', true));

    const user = useSelector(selectUser);

    useEffect(() => {
        getDocs(q)
            .then((querySnapshot) => {
                const products = [];
                querySnapshot.forEach(async (doc) => {
                    products[doc.id] = doc.data();
                    const priceRef = collection(doc.ref, 'prices');
                    getDocs(priceRef).then((priceSnap) => {
                        priceSnap.forEach((price) => {
                            products[doc.id].prices = {
                                priceId: price.id,
                                priceData: price.data()
                            };
                        });
                    });
                });
                setPlans(products);
            })
            .catch((error) => {
                console.log('Error getting documents: ', error);
            });
    }, []);

    useEffect(() => {
        onSnapshot(collection(db, 'customers', user.uid, 'subscriptions'), async (snap) => {
            snap.forEach(async (doc) => {
                setSubscription({
                    role: doc.data().role,
                    current_period_end: doc.data().current_period_end.seconds,
                    current_period_start: doc.data().current_period_start.seconds
                });
            });
        });
    }, [user.uid]);

    const loadCheckout = async (priceId) => {
        const docRef = await addDoc(collection(db, 'customers', user.uid, 'checkout_sessions'), {
            price: priceId,
            success_url: window.location.origin,
            cancel_url: window.location.origin
        });

        const subscribe = onSnapshot(
            doc(db, 'customers', user.uid, 'checkout_sessions', docRef.id),
            async (snap) => {
                const { error, sessionId } = snap.data();
                if (error) {
                    alert(`An error occured: ${error.message}`);
                }
                if (sessionId) {
                    const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
                    stripe.redirectToCheckout({ sessionId });
                }
            }
        );
    };

    return (
        <div className="flex flex-col gap-3">
            <h1 className="font-bold border-b-2 border-gray-500">{`Plans (Current Plan: ${subscription?.role.toUpperCase()})`}</h1>
            <p className="text-sm">{`Renewal date: ${new Date(
                subscription?.current_period_end * 1000
            ).toLocaleDateString()}`}</p>
            {Object.entries(plans).map(([productId, productData]) => (
                <div key={productId} className="flex gap-3 px-1 justify-between md:gap-12 md:px-4">
                    <div>
                        <div>
                            <h3 className="text-sm">{productData.name}</h3>
                            <p className="text-xs">{productData.description}</p>
                        </div>
                    </div>
                    {productData.name?.toLowerCase().includes(subscription?.role) ? (
                        <button
                            className="w-fit px-3 h-10 rounded-md border-2 border-none bg-huluGreen focus:outline-green-500 disabled:bg-gray-500"
                            disabled
                        >
                            Current Plan
                        </button>
                    ) : (
                        <button
                            className="w-24 h-10 rounded-md border-2 border-none bg-huluGreen focus:outline-green-500"
                            onClick={() => loadCheckout(productData.prices.priceId)}
                        >
                            Subscribe
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
}

export default PlansScreen;
