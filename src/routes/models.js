const { Router } = require("express");
const router = Router();
const fakeData = require("../data/models.json");
const { filterByPriceRange } = require("../utils");

router.get("/", (req, res) => {
  const greater = req.query.greater ? parseInt(req.query.greater) : 0;
  const lower = req.query.lower ? parseInt(req.query.lower) : 10000000000;
  const data = filterByPriceRange(fakeData, greater, lower);
  if (data.length > 0) {
    return res.json(data);
  }
  return res.status(400).json({
    response: "There are no matches between the selected range",
  });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const index = fakeData.findIndex((data) => data.id == id);
  if (index >= 1) {
    fakeData[index].average_price = body.average_price;
    return res.status(200).json({
      response: "The item has been update",
    });
  }
  return res.status(400).json({
    response: "Not found ID",
  });
});

module.exports = router;
