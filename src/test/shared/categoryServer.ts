import { rest } from "msw";
import { setupServer } from "msw/node";

import { categoriesData } from "../data/categoriesData";

export const handlers = [
  rest.get("http://localhost:5000/categories", async (req, res, ctx) => {
    return res(ctx.json(categoriesData));
  }),
  rest.put("http://localhost:5000/categories/:_id", async (req, res, ctx) => {
    const update = await req.json();
    const { _id } = req.params;
    const index = categoriesData.findIndex((p) => p._id === (_id));
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
    "http://localhost:5000/categories/:_id",
    async (req, res, ctx) => {
      const { _id } = req.params;
      if (categoriesData.find((p) => p._id === (_id))) {
        return res(ctx.json(true));
      } else {
        return res(ctx.json(false));
      }
    }
  ),
];

const categoryServer = setupServer(...handlers);
export default categoryServer;
