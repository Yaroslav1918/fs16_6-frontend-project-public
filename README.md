## Introduction

This project is part of the Frontend module at Integrify Academy. The primary goal of this project is to develop an e-commerce website. Requests were made by employing API endpoints from https://fakeapi.platzi.com/.

## Technologies

- Typescript
- React
- Redux toolkit
- Jest
- MUI

## Features

### User (not logged in)

- able to:
- use carousel effect to display product images
- choose day or night theme.
- view all products
- filter products by price, category or find by name
- view single product page
- see sign up or sign ip
- fill sign in form via google
- add and remove products to cart
- enlarge the product image on the home page

#### Logged in user

- able to:
- view all products
- filter products by price, category or find by name
- view single product page
- add and remove products to cart
- view profile page
- log out

  #### Admin

- able to:
- filter products, users or categories by name
- use previous features
- modify products (create, update, delete)
- modify users (create, update)
- modify categories (create, update, delete)

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
# Front-end Project

Project link https://fs16-6-frontend-project-tau.vercel.app/
