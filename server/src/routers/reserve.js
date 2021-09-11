const express = require("express");
const router = express.Router();
const app = express();
const { Reserve } = require("../models/Reserve");
// router.get("/api/reserve", async (req, res) => {
//   const task = await Task.find();
//   res.send(task);
// });
// router.get("/reserve", async (req, res) => {
//   console.log(req.query);
//   // const task = await Task.find();
//   res.send({ result: "Ok" });
// });
router.post("/api/reserve", async (req, res, next) => {
  try {
    const { detail, date, phone } = req.body;
    const reserve = new Reserve({
      detail,
      date,
      phone,
    });
    let newReserve = await reserve.save();
    res.status(200).send(newReserve);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ mensaje: "Error desconcido, Contactarse con soporte" });
  }
});

// router.put("/api/reserve/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     const { taskname, description, state, responsable } = req.body;

//     let task = await Task.findById(id);

//     if (!task) {
//       res.status(404).send({ mensaje: "La tarea con id = ${id}" });
//       return;
//     }

//     if (taskname) {
//       task.taskname = taskname;
//     }

//     if (description) {
//       task.description = description;
//     }

//     if (state) {
//       task.state = state;
//     }

//     if (responsable) {
//       task.responsable = responsable;
//     }

//     task.save();

//     res.status(200).send(task);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send({ mensaje: "Error desconocido" });
//   }
// });
// router.delete("/api/reserve/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     let task = await Task.deleteOne({ _id: id });

//     if (!task) {
//       res.status(404).send({ mensaje: "La tarea con id = ${id}" });
//       return;
//     }
//     res.status(200).send(task);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send({ mensaje: "Error desconocido" });
//   }
// });

module.exports = router;
