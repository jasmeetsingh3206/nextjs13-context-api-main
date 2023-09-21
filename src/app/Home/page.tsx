"use client"
import Image from 'next/image'
import axios from 'axios';
import { useState, useEffect, HtmlHTMLAttributes, ReactHTMLElement } from 'react';
import ProductCard from '../../components/ProductCard';
import { Product } from "../../Models/apiInterfaces";
import { CounterContext } from "@/context/counter.context";
import React, { useContext } from "react";

import Lottie from "lottie-react";

export default function Home() {
    const [data, setData] = useState<Product[] | null>(null);
    const [cartOpen, setCartOpen] = useState<boolean>(false)

    const { state, dispatch } = useContext(CounterContext);
    const [cartData, setcartData] = useState<Product[] | null>(null);
    useEffect(() => {
        async function fetchData() {
            const res = await axios.get('https://dummyjson.com/products');
            const data = await res.data;
            setData(data.products);
            console.log(data)
        }
        fetchData();
    }, []);


    const itemsInCart = () => {


        console.log(state.cart)
        let items = Array.from(state.cart.keys()) || [];
        let stars: any[] = [];
        console.log("thiws is items in carttttt");
        console.log(items);

        for (let i = 0; i < items.length||0 ; i++) {
            console.log(i)
            const full = state.cart.get(items[i]);
            const data = full?.pdt
            console.log(data)
            if (data) stars.push(
                <li className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img src={data.thumbnail} alt="Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch." className="h-full w-full object-cover object-center" />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                        <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                                <h3>
                                    <a href="#">{data.title}</a>
                                </h3>
                                <p className="ml-4">${data.price}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">Blue</p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                            <button title='increase qualtity' className='hover:font-semibold  scale-150' onClick={()=>{dispatch({ type: "INCREMENT", payload: { id: data.id, pdt: data } })}}>+</button>
                            <p className="text-gray-500">Qty {full.qty}</p>
                            <button title='decrease qualtity' className='hover:font-semibold  scale-150' onClick={()=>{dispatch({ type: "DECREMENT", payload: { id: data.id, pdt: data } })}}>-</button>

                            <div className="flex">
                                <button type="button" onClick={() => dispatch({ type: "RESET", payload: { id: data.id, pdt: data } })} className="font-medium hover:underline text-indigo-600 hover:text-indigo-500">Remove</button>
                            </div>
                        </div>
                    </div>
                </li>)
        }
        return <div className="">
            {stars && stars.length >0 ? stars :
             <lottie-player src="https://lottie.host/f5d120bd-2297-40ed-be9d-df3aef51d2b6/ah1yIXD12D.json" background="transparent" speed="1"  loop autoplay></lottie-player>
                
                }
        </div>
    }





    const ProductsCardsList = (productsData: Product[]) => {
        return <div className="mt-16">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2  lg:grid-cols-3 2xl:grid-cols-4">

                {productsData.map(pdt => {
                    // console.log(pdt);

                    return <>
                        <ProductCard
                            key={pdt.id}
                            pdt={pdt}
                        /></>
                })}
            </div>

        </div>
    }


    return (<div className='bg-white'>
        <header className="h-24 sm:h-28 flex bg-white items-center z-30 w-full fixed">
            <div className="container mx-auto px-6 flex items-center justify-between">
                <div className="uppercase text-gray-800 dark:text-white font-black text-3xl">
                    Watch.ME
                </div>
                <div className="flex items-center">
                    <nav className="font-sen text-gray-800 dark:text-white uppercase text-lg lg:flex items-center ">
                        {/* <a href="#" className="py-2 px-6 flex">
                            Home
                        </a>
                        <a href="#" className="py-2 px-6 flex">
                            Watch
                        </a>
                        <a href="#" className="py-2 px-6 flex">
                            Product
                        </a>
                        <a href="#" className="py-2 px-6 flex">
                            Contact
                        </a>
                        <a href="#" className="py-2 px-6 flex">
                            Carrer
                        </a> */}
                        <div onClick={() => setCartOpen(!cartOpen)} className="relative scale-75 cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-8 w-8 text-gray-600">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                            </svg>
                            <span className="absolute -top-2 left-4 rounded-full bg-red-500 p-0.5 px-2 text-sm text-red-50">{state.count}</span>
                        </div>
                    </nav>
                    <button  className="lg:hidden flex flex-col ml-4">
                        <span className="w-6 h-1 bg-gray-800 dark:bg-white mb-1">
                        </span>
                        <span className="w-6 h-1 bg-gray-800 dark:bg-white mb-1">
                        </span>
                        <span className="w-6 h-1 bg-gray-800 dark:bg-white mb-1">
                        </span>
                    </button>
                </div>
            </div>
        </header>


        {cartOpen && <div className="relative z-[100]" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">

            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

            <div className="fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                        <div className="pointer-events-auto w-screen max-w-md">
                            <div className="flex h-full flex-col bg-white shadow-xl">
                                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                    <div className="flex items-start justify-between">
                                        <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">Shopping cart</h2>
                                        <div className="ml-3 flex h-7 items-center">
                                            <button type="button" onClick={() => setCartOpen(false)} className="relative -m-2 p-2 text-gray-400 hover:text-gray-500">
                                                <span className="absolute -inset-0.5"></span>
                                                <span className="sr-only">Close panel</span>
                                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
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

                                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                        <p>Subtotal</p>
                                        <p>${state.price}</p>
                                    </div>
                                    <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                                    <div className="mt-6">
                                        <a href="#" className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">Checkout</a>
                                    </div>
                                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
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
        </div>}


        <main className="dark:bg-gray-800 pt-14 bg-white relative overflow-hidden min-h-screen">

            <div className="bg-white dark:bg-gray-800 flex relative z-20 items-center overflow-hidden">
                <div className="container mx-auto px-6 flex relative py-16">
                    <div className="sm:w-2/3 lg:w-2/5 flex flex-col relative z-20">
                        <span className="w-20 h-2 bg-gray-800 dark:bg-white mb-12">
                        </span>
                        <h1 className="font-bebas-neue uppercase text-6xl sm:text-8xl font-black flex flex-col leading-none dark:text-white text-gray-800">
                            Be on
                            <span className="text-5xl sm:text-7xl">
                                Time
                            </span>
                        </h1>
                        <p className="text-sm sm:text-base text-gray-700 dark:text-white">
                            Dimension of reality that makes change possible and understandable. An indefinite and homogeneous environment in which natural events and human existence take place.
                        </p>
                        <div className="flex mt-8">
                            <a href="#" className="uppercase py-2 px-4 rounded-lg bg-pink-500 border-2 border-transparent text-white text-md mr-4 hover:bg-pink-400">
                                Get started
                            </a>
                            <a href="#" className="uppercase py-2 px-4 rounded-lg bg-transparent border-2 border-pink-500 text-pink-500 dark:text-white hover:bg-pink-500 hover:text-white text-md">
                                Read more
                            </a>
                        </div>
                    </div>
                    <div className="hidden sm:block sm:w-1/3 lg:w-3/5 relative">
                        <img alt='applewatch' src="https://www.tailwind-kit.com/images/object/10.png" className="max-w-xs md:max-w-sm m-auto" />
                    </div>
                </div>
            </div>
            <div className="">

                {/* {data && <ProductsCardsList productsData={data} /> }  */}
                {data && ProductsCardsList(data)}


            </div>

        </main>
    </div>)

}
