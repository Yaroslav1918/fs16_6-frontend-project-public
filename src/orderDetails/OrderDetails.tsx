import {
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  Paper,
  Typography,
} from "@mui/material";
import { Order } from "../types/Order";

const OrderDetails: React.FC<{ order: Order }> = ({ order }) => {
  return (
    <Paper
      sx={{
        padding: 2,
        margin: 2,
        boxShadow: 6,
        bgcolor: "background.default",
      }}
    >
      <Typography variant="h6">Order Details</Typography>
      <Typography variant="body1">Date: {order.date}</Typography>
      <Typography variant="body1">Name: {order.shipping.name}</Typography>
      <Typography variant="body1">Email: {order.shipping.email}</Typography>
      <Typography variant="body1">Phone: {order.shipping.phone}</Typography>
      <Typography variant="h6" style={{ marginTop: 16 }}>
        Shipping Information
      </Typography>
      <Typography variant="body1">
        City: {order.shipping.address.city}
      </Typography>
      <Typography variant="body1">
        Country: {order.shipping.address.country}
      </Typography>
      <Typography variant="body1">
        Address: {order.shipping.address.line1}
      </Typography>
      <Typography variant="body1">
        Postal Code: {order.shipping.address.postal_code}
      </Typography>

      <Typography variant="h6" style={{ marginTop: 16 }}>
        Product Information
      </Typography>
      <List>
        {order.products.map((product) => (
          <ListItem key={product.productId._id}>
            <Card
              sx={{
                width: "100%",
                bgcolor: "background.default",
                boxShadow: 4,
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-around",
                  alignItems: "center",
                  padding: 2,
                  "@media (max-width:600px)": {
                    flexDirection: "column",
                  },
                }}
              >
                <Typography variant="body1">
                  Name: {product.productId.name}
                </Typography>
                <Typography variant="body1">
                  Price: {product.productId.price} $
                </Typography>
                <Typography variant="body1">
                  Quantity: {product.quantity}
                </Typography>
                <Box
                  component="img"
                  src={product.productId.images[0]}
                  sx={{ width: "70px", borderRadius: "10px" }}
                  alt={product.productId.name}
                />
              </CardContent>
            </Card>
          </ListItem>
        ))}
      </List>

      <Typography variant="h6" style={{ marginTop: 16 }}>
        Total price
      </Typography>
      <Typography variant="body1">Total: {order.total} $</Typography>
      <Typography variant="h6" style={{ marginTop: 16 }}>
        Statuses
      </Typography>
      <Typography variant="body1">Delivery: {order.delivery_status}</Typography>
      <Typography variant="body1">Payment: {order.payment_status}</Typography>
    </Paper>
  );
};

export default OrderDetails;
