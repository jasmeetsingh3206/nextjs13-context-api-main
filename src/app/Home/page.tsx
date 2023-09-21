"use client"
import Image from 'next/image'
import axios from 'axios';
import { useState, useEffect, HtmlHTMLAttributes, ReactHTMLElement } from 'react';
import ProductCard from '../../components/ProductCard';
import { Product } from "../../Models/apiInterfaces";
import { CounterContext } from "@/context/counter.context";
import React, { useContext } from "react";
import { motion, useScroll } from "framer-motion"
import SearchBar from '@/components/SearchBar';
import CheckoutPage from '@/components/checkoutModal';

export default function Home() {
    const [data, setData] = useState<Product[] | null>(null);
    const [cartOpen, setCartOpen] = useState<boolean>(false)

    const { state, dispatch } = useContext(CounterContext);
    const [cartData, setcartData] = useState<Product[] | null>(null);

    async function fetchData() {
        const res = await axios.get('https://dummyjson.com/products');
        const data = await res.data;
        setData(data.products);
        console.log(data)
    }
    useEffect(() => {
        fetchData();
    }, []);


    const itemsInCart = () => {


        console.log(state.cart)
        let items = Array.from(state.cart.keys()) || [];
        let stars: any[] = [];
        console.log("thiws is items in carttttt");
        console.log(items);

        for (let i = 0; i < items.length || 0; i++) {
            console.log(i)
            const full = state.cart.get(items[i]);
            const data = full?.pdt
            console.log(data)
            if (data) stars.push(
                <li className="flex py-6">
                    <div className="flex-shrink-0 w-24 h-24 overflow-hidden border border-gray-200 rounded-md">
                        <img src={data.thumbnail} alt="Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch." className="object-cover object-center w-full h-full" />
                    </div>

                    <div className="flex flex-col flex-1 ml-4">
                        <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                                <h3>
                                    <a href="#">{data.title}</a>
                                </h3>
                                <p className="ml-4">${data.price}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">Blue</p>
                        </div>
                        <div className="flex items-end justify-between flex-1 text-sm">
                            <button title='increase qualtity' className='scale-150 hover:font-semibold' onClick={() => { dispatch({ type: "INCREMENT", payload: { id: data.id, pdt: data } }) }}>+</button>
                            <p className="text-gray-500">Qty {full.qty}</p>
                            <button title='decrease qualtity' className='scale-150 hover:font-semibold' onClick={() => { dispatch({ type: "DECREMENT", payload: { id: data.id, pdt: data } }) }}>-</button>

                            <div className="flex">
                                <button type="button" onClick={() => dispatch({ type: "RESET", payload: { id: data.id, pdt: data } })} className="font-medium text-indigo-600 hover:underline hover:text-indigo-500">Remove</button>
                            </div>
                        </div>
                    </div>
                </li>)
        }
        return <div className="">
            {stars && stars.length > 0 ? stars :
                <lottie-player src="https://lottie.host/f5d120bd-2297-40ed-be9d-df3aef51d2b6/ah1yIXD12D.json" background="transparent" speed="1" loop autoplay></lottie-player>

            }
        </div>
    }





    const ProductsCardsList = (productsData: Product[]) => {
        return <div className="mt-16">
            <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">

                {productsData.map(pdt => {
                    // console.log(pdt);

                    return <>
                        <motion.div className='flex justify-center'
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                        >
                            <ProductCard
                                key={pdt.id}
                                pdt={pdt}
                            />
                        </motion.div>
                    </>
                })}
            </div>

        </div>
    }


    return (<div className='bg-white'>
        <header className="fixed z-30 flex items-center w-full h-24 bg-white shadow sm:h-28">
            <div className="container flex items-center justify-between px-6 mx-auto">
                <div className="text-3xl font-black text-gray-800 uppercase dark:text-white">
                    Watch.ME
                </div>
                <div className="flex items-center">
                    <nav className="items-center text-lg text-gray-800 uppercase font-sen dark:text-white lg:flex ">
                        <div onClick={() => setCartOpen(!cartOpen)} className="relative scale-75 cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-8 h-8 text-gray-600">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                            </svg>
                            <span className="absolute -top-2 left-4 rounded-full bg-red-500 p-0.5 px-2 text-sm text-red-50">{state.count}</span>
                        </div>
                    </nav>
                    <button className="flex flex-col ml-4 lg:hidden">
                        <span className="w-6 h-1 mb-1 bg-gray-800 dark:bg-white">
                        </span>
                        <span className="w-6 h-1 mb-1 bg-gray-800 dark:bg-white">
                        </span>
                        <span className="w-6 h-1 mb-1 bg-gray-800 dark:bg-white">
                        </span>
                    </button>
                </div>
            </div>
        </header>


        {cartOpen &&
            <motion.aside
                initial={{ right: '-100px' }}
                whileInView={{ right: '0px' }}
            >
                <div className="transition-all relative z-[100]" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">

                    <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"></div>

                    <div className="fixed inset-0 overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="fixed inset-y-0 right-0 flex max-w-full pl-10 pointer-events-none">
                                <div className="w-screen max-w-md pointer-events-auto">
                                    <div className="flex flex-col h-full bg-white shadow-xl">
                                        <div className="flex-1 px-4 py-6 overflow-y-auto sm:px-6">
                                            <div className="flex items-start justify-between">
                                                <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">Shopping cart</h2>
                                                <div className="flex items-center ml-3 h-7">
                                                    <button type="button" onClick={() => setCartOpen(false)} className="relative p-2 -m-2 text-gray-400 hover:text-gray-500">
                                                        <span className="absolute -inset-0.5"></span>
                                                        <span className="sr-only">Close panel</span>
                                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="mt-8">
                                                <div className="flow-root">
                                                    <ul role="list" className="-my-6 divide-y divide-gray-200">

                                                        {itemsInCart()}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="px-4 py-6 border-t border-gray-200 sm:px-6">
                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                <p>Subtotal</p>
                                                <p>${state.price}</p>
                                            </div>
                                            <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                                            <div className="mt-6">
                                                <a href="#" className="flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700">Checkout</a>
                                            </div>
                                            <div className="flex justify-center mt-6 text-sm text-center text-gray-500">
                                                <p>
                                                    or &nbsp;
                                                    <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
                                                        Continue Shopping
                                                        <span aria-hidden="true"> &rarr;</span>
                                                    </button>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.aside>}


        <main className="relative min-h-screen overflow-hidden bg-white dark:bg-gray-800 pt-14">

            <div className="relative z-20 flex items-center overflow-hidden bg-white dark:bg-gray-800">
                <div className="container relative flex px-6 py-16 mx-auto">
                    <div className="relative z-20 flex flex-col sm:w-2/3 lg:w-2/5">
                        <span className="w-20 h-2 mb-12 bg-gray-800 dark:bg-white">
                        </span>
                        <h1 className="flex flex-col text-6xl font-black leading-none text-gray-800 uppercase font-bebas-neue sm:text-8xl dark:text-white">
                            Be on
                            <span className="text-5xl sm:text-7xl">
                                Time
                            </span>
                        </h1>
                        <p className="text-sm text-gray-700 sm:text-base dark:text-white">
                            Dimension of reality that makes change possible and understandable. An indefinite and homogeneous environment in which natural events and human existence take place.
                        </p>
                        <div className="flex mt-8">
                            <a href="#" className="px-4 py-2 mr-4 text-white uppercase bg-pink-500 border-2 border-transparent rounded-lg text-md hover:bg-pink-400">
                                Get started
                            </a>
                            <a href="#" className="px-4 py-2 text-pink-500 uppercase bg-transparent border-2 border-pink-500 rounded-lg dark:text-white hover:bg-pink-500 hover:text-white text-md">
                                Read more
                            </a>
                        </div>
                    </div>
                    <div className="relative hidden sm:block sm:w-1/3 lg:w-3/5">
                        <img alt='applewatch' src="https://www.tailwind-kit.com/images/object/10.png" className="max-w-xs m-auto md:max-w-sm" />
                    </div>
                </div>
            </div>
            <div className="w-full">
                <SearchBar />
                {/* {data && <ProductsCardsList productsData={data} /> }  */}
                {data && ProductsCardsList(data)}


            </div>

        </main>
        <CheckoutPage/>
    </div>)

}
