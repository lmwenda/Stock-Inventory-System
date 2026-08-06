export const port: number = Number(process.env.PORT) || 5000;

// USER ROUTE URLS

export const CREATE_USER_ENDPOINT = "/create";
export const DELETE_USER_ENDPOINT = "/delete";
export const LOGIN_USER_ENDPOINT = "/login";
export const GET_STOCK_ENDPOINT = "/stock/get";

// PRODUCT ROUTE URLS

export const GET_ALL_PRODUCTS_ENDPOINT = "/get/all";
export const GET_PRODUCT_ENDPOINT = "/get/:id";
export const ADD_PRODUCT_ENDPOOINT = "/add";
export const UPDATE_PRODUCT_DATABASE_ENDPOINT = "/update/database";

// PAYMENT ROUTE URLS

export const CREATE_PAYMENT_ENDPOINT = "/create";
export const VERIFY_PAYMENT_ENDPOINT = "/verify";