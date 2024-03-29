import { rest } from "msw";
import { setupServer } from "msw/node";

import { productsData } from "../data/productsData";
import { CreateProductInput } from "../../types/CreateProductInput";
import { categoriesData } from "../data/categoriesData";

export const handlers = [
  rest.delete(
    "https://ecommerce-api-3946fddfdbf1.herokuapp.com/products/:_id",
    async (req, res, ctx) => {
      const { _id } = req.params;
      if (productsData.find((p) => p._id === _id)) {
        return res(ctx.json(true));
      } else {
        return res(ctx.json(false));
      }
    }
  ),

  rest.get(
    "https://ecommerce-api-3946fddfdbf1.herokuapp.com/products",
    async (req, res, ctx) => {
      return res(ctx.json(productsData));
    }
  ),

  rest.get(
    "https://ecommerce-api-3946fddfdbf1.herokuapp.com/products/:_id",
    async (req, res, ctx) => {
      const { _id } = req.params;
      const product = productsData.find((item) => item._id === _id);
      if (product) {
        return res(ctx.json(product));
      } else {
        ctx.status(400);
        ctx.json({
          message: ["message: Could not find any entity of type"],
          error: "Bad Request",
          statusCode: 400,
        });
      }
    }
  ),

  rest.post(
    "https://ecommerce-api-3946fddfdbf1.herokuapp.com/products/",
    async (req, res, ctx) => {
      const input: CreateProductInput = await req.json();
      const category = categoriesData.find((c) => c._id === input.categoryId);
      if (category) {
        const newProduct = {
          _id: productsData.length + 1,
          images: input.images,
          name: input.name,
          description: input.description,
          category,
          price: input.price,
        };
        return res(ctx.json(newProduct));
      } else {
        ctx.status(400);
        ctx.json({
          message: [
            "price must be a positive number",
            "images must contain at least 1 elements",
            "each value in images must be a URL address",
            "images must be an array",
          ],
          error: "Bad Request",
          statusCode: 400,
        });
      }
    }
  ),

  rest.put(
    "https://ecommerce-api-3946fddfdbf1.herokuapp.com/products/:_id",
    async (req, res, ctx) => {
      const update = await req.json();
      const { _id } = req.params;
      const index = productsData.findIndex((p) => p._id === _id);
      try {
        if (index > -1) {
          return res(
            ctx.json({
              ...productsData[index],
              ...update,
            })
          );
        } else {
          ctx.status(400);
          return res(
            ctx.json({
              message: [
                "price must be a positive number",
                "images must contain at least 1 elements",
                "each value in images must be a URL address",
                "images must be an array",
              ],
              error: "Bad Request",
              statusCode: 400,
            })
          );
        }
      } catch (e) {
        console.log("error happen in put");
      }
    }
  ),
];

const productServer = setupServer(...handlers);
export default productServer;
