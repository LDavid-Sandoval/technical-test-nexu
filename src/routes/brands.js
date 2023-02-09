const { Router } = require("express");
const router = Router();
const modelSchema = require("../model/model");
const brandSchema = require("../model/brand");

router.get("/", async (req, res) => {
  const data = await brandSchema.find(
    {},
    {
      _id: false,
    },
    { sort: { id: 1 } }
  );
  if (data.length > 0) {
    return res.json(data);
  }
  return res.status(400).json({
    response: "No brand information",
  });
});

router.get("/:id/models", async (req, res) => {
  const id = req.params.id;
  const brand = await brandSchema.find({
    id,
  });
  if (brand.length > 0) {
    const data = await modelSchema.find({
      brand_name: brand[0].brand_name,
    });
    return res.json(data);
  } else {
    return res.status(500).json({
      response: "This brand ID not exists",
    });
  }
});

router.post("/", async (req, res) => {
  const body = req.body;
  if (body.name) {
    const brandExists = await brandSchema.find({
      brand_name: body.name,
    });
    if (brandExists.length === 0) {
      const idLastItem = await brandSchema.find().sort({ id: -1 }).limit(1);
      const newModel = {
        id: idLastItem[0].id + 1,
        brand_name: body.name,
      };
      const brandSave = brandSchema(newModel);
      try {
        await brandSave.save();
        return res.json({
          response: "The brand has been added",
        });
      } catch (err) {
        console.log("error save new Brand", err);
        return res.status(500).json({
          response: "error save new Brand",
        });
      }
    }
    return res.status(500).json({
      response: "This brand already exists",
    });
  }
});

router.post("/:id/models", async (req, res) => {
  const id = req.params.id;
  const brand = await brandSchema.find({
    id,
  });
  if (brand.length > 0) {
    const body = req.body;
    if (body.average_price && body.average_price < 100000) {
      return res.status(500).json({
        response: "The average price must be greater than 100,000",
      });
    }
    if (body.name) {
      const nameExist = modelSchema.find({
        name: body.name,
        brand_name: brand[0].brand_name,
      });
      if (nameExist.length === 0) {
        const average = body.average_price ? body.average_price : 0;
        const name = body.name;
        const idLastItem = await modelSchema.find().sort({ id: -1 }).limit(1);
        const idModel = idLastItem[0].id + 1;
        const newModel = {
          id: idModel,
          name: name,
          average_price: average,
          brand_name: brandName,
        };
        const modelSave = modelSchema(newModel);
        try {
          await modelSave.save();
          return res.json({
            response: "The model has been added",
          });
        } catch (err) {
          console.log("error save new model", err);
        }
      }
      return res.status(500).json({
        response: "The name already exists",
      });
    } else {
      return res.status(500).json({
        response: "The name is required",
      });
    }
  } else {
    return res.status(500).json({
      response: "This brand ID not exists",
    });
  }
});

module.exports = router;
