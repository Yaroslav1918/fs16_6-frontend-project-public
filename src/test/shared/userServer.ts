import { rest } from "msw";
import { setupServer } from "msw/node";
import { usersData } from "../data/usersData";

export const access_token = "my-access-token";
export const handlers = [
  rest.post("http://localhost:5000/users/signup", async (req, res, ctx) => {
    const userData = await req.json();

    const isExiStEmail = usersData.some((i) => i.email === userData.email);
    if (!isExiStEmail) {
      const newUser = {
        id: usersData.length + 1,
        name: userData.name,
        email: userData.email,
        avatar: userData.avatar,
        role: userData.role,
      };

      return res(ctx.json(newUser));
    } else {
      ctx.status(400);
      ctx.json({
        message: [
          "email must be an email",
          "role must be one of the following values: admin, customer",
          "avatar must be a URL address",
        ],
        error: "Bad Request",
        statusCode: 400,
      });
    }
  }),
  rest.get("http://localhost:5000/users", (req, res, ctx) => {
    return res(ctx.json(usersData));
  }),
  rest.put("http://localhost:5000/users/:_id", async (req, res, ctx) => {
    const update = await req.json();
    const { _id } = req.params;
    const index = usersData.findIndex((p) => p._id === _id);
    try {
      if (index > -1) {
        return res(
          ctx.json({
            ...usersData[index],
            ...update,
          })
        );
      } else {
        ctx.status(400);
        return res(
          ctx.json({
            message: [
              "email must be an email",
              "role must be one of the following values: admin, customer",
              "avatar must be a URL address",
            ],
            error: "Bad Request",
            statusCode: 400,
          })
        );
      }
    } catch (e) {
      console.log("error happen in put");
    }
  }),
  rest.post("http://localhost:5000/users/login", async (req, res, ctx) => {
    const { email, password } = await req.json();
    const foundUser = usersData.find(
      (u) => u.email === email && u.password === password
    );
    if (foundUser) {
      const token = access_token + "_" + foundUser._id;
      return res(ctx.json({ access_token: token }));
    } else {
      ctx.status(401);
      return res(ctx.text("Cannot authenticate user"));
    }
  }),
];
const userServer = setupServer(...handlers);
export default userServer;
