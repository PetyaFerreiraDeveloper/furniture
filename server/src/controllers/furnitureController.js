const router = require("express").Router();

const api = require("../services/furnitureService");
const errorMapper = require('../util/errorMapper');

router.get("/", async (req, res) => {
  res.json(await api.getAll());
});

router.post("/", async (req, res) => {
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
    console.error(err);
    const message = errorMapper(err)
    res.status(400).json({ message });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const item = await api.getById(id);
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: `Item ${id} not found` });
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;

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
    const result = await api.updateById(id, item);
    res.json(result);
  } catch (err) {
    if (err._notFound) {
      res.status(404).json({ message: `Item ${id} not found` });
    } else {
      console.error(err);
      res.status(400).json({ message: "request error" });
    }
  }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const result = await api.deleteById(id);
        res.json(result);
      } catch (err) {
          console.error(err);
          res.status(404).json({ message: `Item ${id} not found` });
        }
});

module.exports = router;
