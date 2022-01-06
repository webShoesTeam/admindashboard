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

  if (id.localeCompare(user._id) != 0) {
    await adminListService.findByIdAndUpdate(id);
    res.redirect('/admin');
  }
  else {
    res.redirect('/admin');
    //Todo: alert()
  }
};