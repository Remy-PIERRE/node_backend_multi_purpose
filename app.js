const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const initDB = require("./utils/initDB");
const authRouter = require("./routes/auth");
const projectsRouter = require("./routes/projects");
const filmsRouter = require("./routes/films");
const badRouteHandler = require("./middlewares/badRouteHandler");
const errorHandler = require("./middlewares/errorHandler");

/* INIT APP */
const app = express();

// INIT DB //
initDB();

/* MIDDLEWARES */
app.use("/public", express.static("public"));
app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/* ROUTES */
app.use("/api/auth", authRouter);
app.use("/api/projects", projectsRouter);
app.use("/api/films", filmsRouter);
app.use("*", badRouteHandler);

app.use(errorHandler);

// OPEN SERVEUR //
const port = process.env.PORT || 4000;
app.listen(port, console.log(`Server is listening port ${port} ...`));
