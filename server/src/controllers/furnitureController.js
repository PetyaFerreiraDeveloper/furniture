const router = require("express").Router();

const api = require("../services/furnitureService");

router.get("/", async (req, res) => {
  res.json(await api.getAll());
});

router.post("/", async (req, res) => {
  console.log(req.body);
  const item = {
    make: req.body.make,
    model: req.body.model,
    year: req.body.year,
    description: req.body.description,
    price: req.body.price,
    img: req.body.img,
    material: req.body.material,
  };

  try {
    const result = await api.create(item);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: "request error" });
  }
});

module.exports = router;
