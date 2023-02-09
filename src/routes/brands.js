const { Router } = require("express");
const router = Router();
const fakeData = require("../data/models.json");
const fakeDataBrand = require("../data/brands.json");
const {
  groupByBrand,
  findBrandName,
  filterModelsForBrand,
  findBrandExist,
  getIndex,
  findNameModelExist,
  getIndexModel,
} = require("../utils");

router.get("/", (req, res) => {
  const data = groupByBrand(fakeData);
  if (data.length > 0) {
    return res.json(data);
  }
  return res.status(400).json({
    response: "No brand information",
  });
});

router.get("/:id/models", (req, res) => {
  const id = req.params.id;
  const brandName = findBrandName(parseInt(id));
  if (brandName) {
    const data = filterModelsForBrand(brandName);
    return res.json(data);
  } else {
    return res.status(500).json({
      response: "This brand ID not exists",
    });
  }
});

router.post("/", (req, res) => {
  const body = req.body;
  if (body.name) {
    const brandExists = findBrandExist(body.name);
    if (!brandExists) {
      const newID = getIndex();
      const newModel = {
        id: newID,
        brand_name: body.name,
      };
      fakeData.push(newModel);
      return res.json({
        response: "The brand has been added",
      });
    }
    return res.status(500).json({
      response: "This brand already exists",
    });
  }
});

router.post("/:id/models", (req, res) => {
  const id = req.params.id;
  const brandName = findBrandName(parseInt(id));
  if (brandName) {
    const body = req.body;
    if (body.average_price && body.average_price < 100000) {
      return res.status(500).json({
        response: "The average price must be greater than 100,000",
      });
    }
    if (body.name) {
      const nameExist = findNameModelExist(body.name, brandName);
      if (!nameExist) {
        const average = body.average_price ? body.average_price : 0;
        const name = body.name;
        const idModel = getIndexModel();
        const newModel = {
          id: idModel,
          name: name,
          average_price: average,
          brand_name: brandName,
        };
        fakeDataBrand.push(newModel);
        return res.json({
          response: "The model has been added",
        });
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
