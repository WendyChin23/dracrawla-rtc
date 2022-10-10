'use strict';

const userModel = require('../models/user.models');

exports.getDevices = (req, res) => {
  try {
    const data = userModel.main_room;
    res.status(200);
    res.send(JSON.stringify(data));
  } catch (error) {
    res.sendStatus(500);
  }
};