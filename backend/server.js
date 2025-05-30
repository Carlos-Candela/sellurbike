const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { dbConnect } = require("./utiles/db");

app.use(
  cors({
    origin: [process.env.CORS_URL],
    credentials: true,
  }
  )
);

app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api", require("./routes/authRoutes"));
app.use("/api", require("./routes/categoriesRoutes"))
app.use("/api", require("./routes/productRoutes"))
app.use("/api", require('./routes/sellerRoutes'))
app.use("/api", require("./routes/orderRoutes"))

const port = process.env.PORT;
dbConnect();
app.listen(port, () => console.log(`Server is running on port ${port}`));

