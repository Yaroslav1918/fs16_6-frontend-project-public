import { rest } from "msw";
import { setupServer } from "msw/node";

import { categoriesData } from "../data/categoriesData";
import { CategoryInput } from "../../types/CategoryInput";

export const handlers = [
  rest.get("https://ecommerce-api-3946fddfdbf1.herokuapp.com/categories", async (req, res, ctx) => {
    return res(ctx.json(categoriesData));
  }),
  rest.put("https://ecommerce-api-3946fddfdbf1.herokuapp.com/categories/:_id", async (req, res, ctx) => {
    const update = await req.json();
    const { _id } = req.params;
    const index = categoriesData.findIndex((p) => p._id === _id);
    try {
      if (index > -1) {
        return res(
          ctx.json({
            ...categoriesData[index],
            ...update,
          })
        );
      } else {
        ctx.status(400);
        return res(
          ctx.json({
            message: ["image must be a URL address"],
            error: "Bad Request",
            statusCode: 400,
          })
        );
      }
    } catch (e) {
      console.log("error happen in put");
    }
  }),
  rest.delete(
    "https://ecommerce-api-3946fddfdbf1.herokuapp.com/categories/:_id",
    async (req, res, ctx) => {
      const { _id } = req.params;
      if (categoriesData.find((p) => p._id === _id)) {
        return res(ctx.json(true));
      } else {
        return res(ctx.json(false));
      }
    }
  ),
  rest.post("https://ecommerce-api-3946fddfdbf1.herokuapp.com/categories", async (req, res, ctx) => {
    const categoryData: CategoryInput = await req.json();
    const newCategory = {
      _id: categoriesData.length + 1,
      name: categoryData.name,
      images: categoryData.images,
    };

    return res(ctx.json(newCategory));
  }),
];

const categoryServer = setupServer(...handlers);
export default categoryServer;
