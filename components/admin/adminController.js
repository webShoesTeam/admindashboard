const adminListService = require('./adminService');

exports.list = async function(req, res) {
    const perPage = 3;
    const page = req.params.page || 1;
    const count = await adminListService.count();
    const admins = await adminListService.list(page,perPage);
    res.render('admin/list', {
        admins,
        current: page,
        pages: Math.ceil(count / perPage)
      });
};