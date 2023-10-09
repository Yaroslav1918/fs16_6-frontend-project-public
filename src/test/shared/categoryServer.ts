import { rest } from "msw";
import { setupServer } from "msw/node";

import { categoriesData } from "../data/categoriesData";

export const handlers = [
  rest.get(
    "https://api.escuelajs.co/api/v1/categories",
    async (req, res, ctx) => {
      return res(ctx.json(categoriesData));
    }
  ),
  rest.put(
    "https://api.escuelajs.co/api/v1/categories/:id",
    async (req, res, ctx) => {
      const update = await req.json();
      const { id } = req.params;
      const index = categoriesData.findIndex((p) => p.id === Number(id));
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
    }
  ),
  rest.delete(
    "https://api.escuelajs.co/api/v1/categories/:id",
    async (req, res, ctx) => {
      const { id } = req.params;
      if (categoriesData.find((p) => p.id === Number(id))) {
        return res(ctx.json(true));
      } else {
        return res(ctx.json(false));
      }
    }
  ),
];

const categoryServer = setupServer(...handlers);
export default categoryServer;
