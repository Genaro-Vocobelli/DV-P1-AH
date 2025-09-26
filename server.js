import express from "express";
import RecetasRoute from "./routes/recetas.routes.js"
import ChefsRoute from "./routes/chefs.routes.js"
import RecetasApiRoute from "./api/routes/recetas.api.routes.js"
import ChefsApiRoute from "./api/routes/chefs.api.routes.js"
const app = express();

app.use( express.urlencoded({extended: true}) )
app.use( express.json() )
app.use(RecetasRoute)
app.use(ChefsRoute)
app.use("/api/recetas",RecetasApiRoute)
app.use("/api/chefs", ChefsApiRoute)


app.use(express.static("public"));
app.listen(3333, () => console.log("funcionando"));