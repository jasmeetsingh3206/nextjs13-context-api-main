"use client";

import { Product } from "@/Models/apiInterfaces";
import React, { Dispatch, createContext, useReducer } from "react";

type StateType = {
  count: number;
  cart: Map<number, cartPdt>;
  price: number,
  allPdts: Product[]
};

type ActionPayload = {
  id: number,
  pdt: Product,
};

type ProductsPayload = {
  pdts: Product[],
};

type cartPdt = {
  id: number,
  pdt: Product,
  qty: number,
};


type ActionType = {
  type: string;
  payload: ActionPayload
};

const initialState: StateType = {
  count: 0,
  cart: new Map<number, cartPdt>,
  price: 0,
  allPdts: []
};



const reducer = (state: StateType, action: ActionType) => {

  switch (action.type) {
    case "INCREMENT": {
      const { id, pdt } = action.payload;
      let count = state.cart.get(id)?.qty || 0;
      state.cart.set(id, { id: id, pdt: pdt, qty: count + 1 })
      state.price += pdt.price;
      return { ...state, count: state.count + 1 };
    }
    case "DECREMENT": {
      const { id, pdt } = action.payload;
      let count = state.cart.get(id)?.qty || 0;
      if (count > 0) {
        state.cart.set(id, { id: id, pdt: pdt, qty: count - 1 })
        state.price -= pdt.price;
        if (count == 1) state.cart.delete(id)
        return { ...state, count: state.count - 1 };
      }
      return { ...state };
    }
    case "RESET": {
      const { id, pdt } = action.payload;
      let count = state.cart.get(id)?.qty || 0;
      if (count > 0) {
        state.price -= (pdt.price * count);
        state.cart.delete(id)
      }
      return { ...state, count: state.count - count };
    }
    case "ADD": {
      // state.allPdts = action.payload
        return { ...state };
    }
    default:
      return state;
  }
};

export const CounterContext = createContext<{
  state: StateType;
  dispatch: Dispatch<ActionType>;
}>({ state: initialState, dispatch: () => null });

export const CounterContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CounterContext.Provider value={{ state, dispatch }}>
      {children}
    </CounterContext.Provider>
  );
};
