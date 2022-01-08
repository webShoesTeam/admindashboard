const adminListService = require('./adminService');

exports.list = async function(req, res) {
    const perPage = 6;
    const page = req.params.page || 1;
    const count = await adminListService.count();
    const admins = await adminListService.list(page,perPage);
    res.render('admin/list', {
        admins,
        current: page,
        pages: Math.ceil(count / perPage)
      });
};

exports.isBanned = async function(req, res) {
  const id = req.params.id;
  const user = req.user;

  console.log(user._id);
  console.log(id);
  var data = {
    "success": true,
    "isBan": true
  };
  if (id.localeCompare(user._id) != 0) {
    data.isBan = await adminListService.findByIdAndUpdate(id);
    res.status(201).json(data);
  }
  else {
    data.success = false;
    res.status(201).json(data);
  }
};