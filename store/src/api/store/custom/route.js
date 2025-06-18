const { MedusaRequest, MedusaResponse } = require("@medusajs/framework/http");

async function GET(req, res) {
  res.sendStatus(200);
}

module.exports = { GET };
