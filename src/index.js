const app = require("./app");
//STARTING SERVER
app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}! `);
});
