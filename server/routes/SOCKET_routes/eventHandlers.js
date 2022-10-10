'use strict';

const messageModel = require('../../models/message.models');
const userModel = require('../../models/user.models');

//Event handlers

exports.addToDB = (id) => {
  try {
    return addDevice(id);
  } catch (error) {
    console.error(error);
  }
};

exports.onClientDisconnect = (id) => {
  const updatedClientList = removeDevice(id);
  return updatedClientList;
};

//Helper functions

function addDevice(id) {
  userModel.main_room.push({ id, messageCount: 0 });
  return userModel.main_room;
}

function removeDevice(id) {
  let index = userModel.main_room.map(el => el.id).indexOf(id);
  userModel.main_room.splice(index, 1);
  return userModel.main_room;
}
