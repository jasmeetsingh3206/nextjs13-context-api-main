"use client"
import { Product } from "../Models/apiInterfaces";
import { CounterContext } from "@/context/counter.context";
import React, { useContext, useEffect } from "react";
import Image from "next/image";
import toast, { Toaster } from 'react-hot-toast';

interface CardProps {
    pdt: Product
}

export default function ProductCard(props: CardProps) {
    const { state, dispatch } = useContext(CounterContext);

    useEffect(() => {
        console.log("cart is mounted");
        console.log(localStorage.getItem('cart'));



    }, [])

    const rating = (rating: number) => {
        let stars: any[] = [];

        for (let i = 0; i < Math.round(rating); i++) {
            stars.push(
                <svg aria-hidden="true" key={i} className="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>)
        }
        return <div className="flex">{stars}</div>


    }

    return (
        <>
            <Toaster
                toastOptions={{
                    duration: 50000,
                    
                    
                }}
            />

            <div className="relative m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border-2  border-gray-100 bg-white shadow-lg">
                <a className="relative mx-3 mt-3 flex justify-center h-60 overflow-hidden rounded-xl" href="#">
                    <Image placeholder="empty" loading="lazy" height={240} width={294} objectFit="cover" className=" object-cover hover:scale-125 transition-all" alt={`image-${props.pdt.title}`} src={props.pdt.thumbnail} />
                    <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">{props.pdt.discountPercentage}% OFF</span>
                </a>
                <div className="mt-4 px-5 pb-5">
                    <a href="#">
                        <h5 className="text-xl tracking-tight text-slate-900">{props.pdt.title}</h5>
                    </a>
                    <div className="mt-2 mb-5 flex items-center justify-between">
                        <p>
                            <span className="text-3xl font-bold text-slate-900">${props.pdt.price}</span>
                            <span className="text-sm text-slate-900 line-through">${(props.pdt.price * 100 / (100 - props.pdt.discountPercentage)).toPrecision(4)}</span>
                        </p>
                        <div className="flex items-center shadow-lg">
                            {rating(props.pdt.rating)}
                            <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">{props.pdt.rating}</span>
                        </div>
                    </div>
                    {/* <h4 style={{ marginBottom: 16 }}>{state.count}</h4> */}
                    <button onClick={() => {
                        console.log("adding")
                        toast.success('added to cart', {
                            duration: 1500,
                            style: {
                                borderRadius: 8,
                                border: '2px solid black',
                                padding: '5px 10px',
                                color: '#713200',
                                boxShadow: 'none',
                                // boxShadow: '0px 10px 15px -3px rgba(0,0,0,0.1)'
                                
                            },
                            
                        }); dispatch({ type: "INCREMENT", payload: { id: props.pdt.id, pdt: props.pdt } })
                    }} className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Add to cart
                    </button>
                </div>
            </div>

        </>

    );
}
