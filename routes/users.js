const { users } = require("../server");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  if (!users.length) {
    return res.status(400).json({
      msg: "malumot topilmadi",
      variant: "error",
      payload: null,
    });
  }
  res.status(200).json({
    msg: "Barcha foydalanuvchilar",
    variant: "success",
    payload: users,
    total: users.length,
  });
});

router.post("/", (req, res) => {
  let existUser = users.find((user) => user.username === req.body.username);
  if (existUser) {
    return res.status(400).json({
      msg: "username mavjud",
      variant: "warning",
      payload: null,
    });
  }
  let newUser = {
    id: new Date().getTime(),
    fname: req.body.fname,
    username: req.body.username,
    password: req.body.password,
  };
  users.push(newUser);
  res.status(201).json({
    msg: "Qo'shildi",
    variant: "success",
    payload: newUser,
  });
});

router.delete("/:id", (req, res) => {
  let existUser = users.findIndex(
    (user) => user.id === parseInt(req.params.id)
  );

  if (existUser < 0) {
    return res.status(400).json({
      msg: "user topilmadi",
      variant: "error",
      payload: null,
    });
  }
  users.splice(existUser, 1);
  res.status(200).json({
    msg: "o'chirildi",
    variant: "success",
    payload: null,
  });
});

router.put("/:id", (req, res) => {
  let id = +req.params.id;
  let userIndex = users.findIndex((user) => user.id === id);
  if (userIndex < 0) {
    return res.status(400).json({
      msg: "malumot topilmadi",
      variant: "error",
      payload: null,
    });
  }

  let updeteUser = {
    id,
    ...req.body,
  };

  users.splice(userIndex, 1, updeteUser);
  res.status(200).json({
    msg: "o'zgartirildi",
    variant: "success",
    payload: updeteUser,
  });
});

module.exports = router;
