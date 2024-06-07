const mongoose = require("mongoose");
const uri =
  "mongodb://admin:admin@localhost:27018/requisicoes?authSource=requisicoes";
mongoose.connect(uri, {});
