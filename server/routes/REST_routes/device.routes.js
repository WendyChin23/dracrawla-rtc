'use strict';

const userController = require('../../controllers/device.controllers');

module.exports = (Router) => {
  const router = Router();
  router.route('/api/connected-device')
    .get(userController.getDevices);
  return router;
};

