const express = require("express");
const router = express.Router();
const { Teacher } = require("../models");

router.get("/teacher", async (req, res) => {
  try {
    const teacher = await Teacher.findAll();
    return res.status(200).send({ ...teacher });
  } catch (error) {
    return res.status(500).send({ message: `Error ${error}` });
  }
});

router.post("/teacher", async (req, res) => {
  try {
    const teacher = await Teacher.create({ ...req.body });
    return res.status(201).send({ ...teacher });
  } catch (error) {
    return res.status(500).send({ message: `Error ${error}` });
  }
});

router.put("/teacher/:id", async (req, res) => {
  try {
    const isExist = await Teacher.findByPk(req.params.id);
    if (!isExist) {
      return res.status(404).send({ message: "Teacher Not Found" });
    }
    await Teacher.update({ ...req.body }, { where: { id: req.params.id } });
    return res.status(200).send({ message: "Teacher updated Successfully" });
  } catch (error) {
    return res.status(500).send({ message: `Error ${error}` });
  }
});

router.delete("/teacher/:id", async (req, res) => {
  try {
    const teacher = await Teacher.findByPk(req.params.id);
    teacher.destroy();
    return res.status(202).send({ message: "Teacher Deleted Successfully" });
  } catch (error) {
    return res.status(500).send({ message: `Error ${error}` });
  }
});

module.exports = router;
