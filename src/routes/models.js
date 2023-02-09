const { Router } = require("express");
const router = Router();
const modelSchema = require("../model/model");

router.get("/", async (req, res) => {
  const greater = req.query.greater ? parseInt(req.query.greater) : 0;
  const lower = req.query.lower ? parseInt(req.query.lower) : 10000000000;
  const data = await modelSchema.find(
    {
      average_price: { $gt: greater, $lt: lower },
    },
    {
      _id: false,
    }
  );
  if (data.length > 0) {
    return res.json(data);
  }
  return res.status(400).json({
    response: "There are no matches between the selected range",
  });
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  try {
    const result = await modelSchema.findOneAndUpdate(
      {
        id,
      },
      {
        average_price: body.average_price,
      }
    );
    if (result) {
      return res.status(200).json({
        response: "The item has been update",
      });
    }
    return res.status(500).json({
      response: "Model ID not exist",
    });
  } catch (err) {
    console.log("error update", err);
    return res.status(500).json({
      response: "error in update model",
    });
  }
});

module.exports = router;
