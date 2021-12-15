const customerService = require('./customerService');

exports.list = async function(req, res) {
    const perPage = 3;
    const page = req.params.page || 1;
    const count = await customerService.count();
    const customers = await customerService.list(page,perPage);
    res.render('customer/list', {
        customers,
        current: page,
        pages: Math.ceil(count / perPage)
      });
};