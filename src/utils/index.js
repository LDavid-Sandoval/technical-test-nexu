const dataBrands = require("../data/brands.json");
const dataModels = require("../data/models.json");

const filterByPriceRange = (objects, min, max) => {
  const dataFilter = objects.filter((item) => {
    return item.average_price >= min && item.average_price <= max;
  });

  return dataFilter;
};

const groupByBrand = (array) => {
  return array.reduce((groups, item) => {
    const brandName = item.brand_name;
    const brandGroup = groups.find((group) => group.brand_name === brandName);
    if (brandGroup) {
      brandGroup.average_price = Math.round(
        (brandGroup.average_price + item.average_price) / 2
      );
    } else {
      groups.push({
        id: groups.length + 1,
        brand_name: brandName,
        average_price: item.average_price,
      });
    }
    return groups;
    // .sort((a, b) => (a.brand_name > b.brand_name ? 1 : -1));
  }, []);
};

const findBrandName = (id) => {
  const found = dataBrands.find((element) => {
    return element.id === id;
  });
  if (found) {
    return found.brand_name;
  }
  return null;
};

const filterModelsForBrand = (brandName) => {
  return dataModels.filter((model) => model.brand_name === brandName);
};

const findBrandExist = (brandName) => {
  const found = dataBrands.find((element) => {
    return element.brand_name === brandName;
  });
  if (found) {
    return true;
  }
  return false;
};

const getIndex = () => {
  return dataBrands.length + 1;
};

const findNameModelExist = (nameModel, brand_name) => {
  const found = dataModels.find((element) => {
    return element.name === nameModel && element.brand_name === brand_name;
  });
  if (found) {
    return true;
  }
  return false;
};

const getIndexModel = () => {
  return dataModels.length + 1;
};

module.exports = {
  filterByPriceRange,
  groupByBrand,
  findBrandName,
  filterModelsForBrand,
  findBrandExist,
  getIndex,
  findNameModelExist,
  getIndexModel,
};
