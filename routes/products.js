const { products } = require("../server");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  if (!products.length) {
    return res.status(400).json({
      msg: "products topilmadi",
      variant: "error",
      payload: null,
    });
  }

  res.status(200).json({
    msg: "Barcha productlar",
    variant: "success",
    payload: products,
    total: products.length,
  });
});

router.post("/", (req, res) => {
  // res.send("ok");
  existProducts = products.find((product) => product.title === req.body.title);
  if (existProducts) {
    return res.status(400).json({
      msg: "title mavjud",
      variant: "warning",
      payload: null,
    });
  }

  let newProducts = {
    id: new Date().getTime(),
    title: req.body.title,
    price: req.body.price,
    category: req.body.category,
    url: req.body.url,
  };

  products.push(newProducts);
  res.status(201).json({
    msg: "Qoshildi",
    variant: "success",
    payload: newProducts,
  });
});

router.delete("/:id", (req, res) => {
  // res.send("ok");
  let existProducts = products.findIndex(
    (product) => product.id === parseInt(req.params.id)
  );

  if (existProducts < 0) {
    return res.status(400).json({
      msg: "product topilmadi",
      variant: "error",
      payload: null,
    });
  }

  products.splice(existProducts, 1);
  res.status(200).json({
    msg: "o'chirildi",
    variant: "success",
    payload: null,
  });
});

router.put("/:id", (req, res) => {
  let id = +req.params.id;
  let productIndex = products.findIndex((product) => product.id === id);
  if (productIndex < 0) {
    return res.status(400).json({
      msg: "malumot topilmadi",
      variant: "error",
      payload: null,
    });
  }

  let updeteProduct = {
    id,
    ...req.body,
  };

  products.splice(productIndex, 1, updeteProduct);
  res.status(200).json({
    msg: "o'zgartirildi",
    variant: "success",
    payload: updeteProduct,
  });
});

module.exports = router;
