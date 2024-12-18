import express from "express";
import categoryRoute from "./category.js";
import authRoute from "./auth.js";
import addressRoute from "./address.js";
import cartRoute from "./cart.js";
import wishlistRoute from "./wishlist.js";
import reviewRoute from "./review.js";
import productRoute from "./product.js";
import uploadRoute from "./upload.js";
import brandRoute from "./brand.js";

const routers = express.Router();

routers.use(`/category`, categoryRoute);
routers.use(`/brand`, brandRoute);
routers.use(`/auth`, authRoute);
routers.use(`/address`, addressRoute);
routers.use(`/cart`, cartRoute);
routers.use(`/wishlist`, wishlistRoute);
routers.use(`/review`, reviewRoute);
routers.use(`/product`, productRoute);
routers.use(`/upload`, uploadRoute);

export default routers;
