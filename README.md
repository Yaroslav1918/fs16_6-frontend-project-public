## Introduction

This project is part of the Frontend module at Integrify Academy. The primary goal of this project is to develop an e-commerce website. Requests were made by employing API endpoints from https://ecommerce-api-3946fddfdbf1.herokuapp.com/.

## Technologies

- Typescript
- React
- Redux toolkit
- Jest
- MUI

## Features

- choose day or night theme.
- stripe payment.
- google authorization.
- responsive web design

### User (not logged in)

- able to:
- use carousel effect to display product images
- view all products
- filter products by price, category or find by name
- view single product page
- direct authentication sign up or sign in
- sign in via google
- add and remove products to cart

#### Logged in user

- able to:
- view all products
- filter products by price, category or find by name
- view single product page
- add and remove products to cart
- view profile page
- log out
- change password in profile page
- view profile page
- view current orders
- sent feedback in contact page

  #### Admin

- able to:
- filter products, users or categories by name
- use previous features
- modify products (create, update, delete)
- modify users (create, update)
- modify categories (create, update, delete)

  ## Env

1. GOOGLE_CLIENT_ID - This is a unique identifier assigned to your application when you register it with the Google API Console.
2. EMAIL_PUBLIC_ID - This is public Key in Emailjs account

## Additional information

1. After a successful login, the user has an hour of access time. After this period, they need to log in again. (A `LogoutTimer` component is implemented, which shows a modal window and redirects to the login page.)
2. Protected routes is implemented.
3. The storage of users' feedback in email via Emailjs.
4. Log in as admin; credentials:
   email: te2423@gmail.com
   password: 12345

## Project structure

```console
.
├── README.md
├── package-lock.json
├── package.json
├── public
│   ├── index.html
│   ├── img
├── src
│   ├── App.tsx
│   ├── index.tsx
│   ├── components
|   |   ├── ....
│   ├── hooks
│   │   ├── useAppDispatch.ts
│   │   └── useAppSelector.ts
│   │   ├── useDebounce.ts
│   │   ├── usePagination.ts
│   ├── pages
│   │   ├── CartPage.tsx
│   │   ├── NotFoundPage.tsx
│   │   ├── HomePage.tsx
│   │   ├── ProfilePage.tsx
│   │   ├── DashBoardPage.tsx
│   │   └── ProductPage.tsx
│   ├── redux
│   │   ├── cart
│   │   │   └── cartSlice.ts
│   │   ├── category
│   │   │   ├── categoryOperation.ts
│   │   │   ├── categorySlice.ts
|   |   |── product
|   |   |      ├── productOperation.ts
|   |   |      ├──productSlice.ts
|   |   |── user
|   |   |      ├── userOperation.ts
|   |   |      ├── userSlice.ts
│   │   |   ── store.ts
│   ├── test
│   │   ├── shared
│   │   │   └── categoryServer.ts
|   |   |   └── productServer.ts
|   |   |   └── userServer.ts
│   │   ├── redux
│   │   │   └── reducers
│   │   │       ├── cartReducer.test.ts
│   │   │       ├── productsReducer.test.tsx
│   │   │       └── userReducer.test.ts
|   |   |       └── userReducer.test.ts
│   │   └── data
│   │   │       ├── cartData.test.ts
│   │   │       ├── categoriesData.test.tsx
│   │   │       └── product.test.ts
|   |   |       └── productsData.test.ts
|   |   |       └── productusersData.test.ts
│   └── types
│       ├── ....
│   └── utils
│       ├── theme
|       |   ├── theme.ts
|       |   ├── ThemeContextProvider.ts
|       |   ├── useColorTheme.ts
│       ├── dataFields.ts
│       ├── extractMessages.ts
│       ├── requestToGoogle.ts
│       ├── scrollToTop.tsx
│       ├── requestToGoogle.ts
│       ├── theme
└── tsconfig.json

18 directories, 69 files
```

# Getting started

1. Clone this repo with git clone https://github.com/Yaroslav1918/fs16_6-frontend-project/tree/main.
2. Install project dependencies using npm ci or npm install command.
3. Run the app with npm start.

## Testing

The test cases for all the Redux store reducers have been built with Jest testing library. In this porject, unit testing approach was used. The test requests are sent to the mock server not the real API.
Run `npm  test` to implement all the tests.

# Front-end Project

[Project Link](https://fs16-6-frontend-project-tau.vercel.app/)
