const express = require("express");
const router = express.Router();
const app = express();
const { Vet } = require("../models/Vet");
router.get("/api/vet", async (req, res) => {
  const vet = await Vet.find();
  console.log(JSON.stringify(vet))
  res.send(vet);
});
// router.get("/reserve", async (req, res) => {
//   console.log(req.query);
//   // const task = await Task.find();
//   res.send({ result: "Ok" });
// });
router.post("/api/vet", async (req, res, next) => {
  try {
    const {
      name,
      phone,
      specialist,
      apartament,
      street,
      number,
      service,
    } = req.body;
    const vet = new Vet({
      name,
      phone,
      specialist,
      apartament,
      street,
      number,
      service,
    });
    let newVet = await vet.save();
    res.status(200).send(newVet);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ mensaje: "Error desconcido, Contactarse con soporte" });
  }
});

router.put("/api/vet/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const {
      name,
      phone,
      specialist,
      apartament,
      street,
      number,
      service,
    } = req.body;

    let vet = await Vet.findById(id);

    if (!vet) {
      res.status(404).send({ mensaje: "La veterinaria con id = ${id}" });
      return;
    }

    if (name) {
      vet.name = name;
    }

    if (phone) {
      vet.phone = phone;
    }

    if (specialist) {
      vet.specialist = specialist;
    }

    if (apartament) {
      vet.apartament = apartament;
    }
    if (street) {
      vet.street = street;
    }
    if (number) {
      vet.number = number;
    }
    if (service) {
      vet.service = service;
    }

    vet.save();

    res.status(200).send(vet);
  } catch (err) {
    console.error(err);
    res.status(500).send({ mensaje: "Error desconocido" });
  }
});
router.delete("/api/vet/:id", async (req, res) => {
  try {
    const id = req.params.id;
    let vet = await Vet.deleteOne({ _id: id });

    if (!vet) {
      res.status(404).send({ mensaje: "La veterinaria  con id = ${id}" });
      return;
    }
    res.status(200).send(vet);
  } catch (err) {
    console.error(err);
    res.status(500).send({ mensaje: "Error desconocido" });
  }
});

module.exports = router;
