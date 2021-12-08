const adminListService = require('./adminListService');

const cloudinary = require('cloudinary').v2;
const formidable = require('formidable');
const form = formidable();

exports.list = async function(req, res) {
    const perPage = 6;
    const page = req.params.page || 1;
    const count = await adminListService.count();
    const admins = await adminListService.list(page,perPage);
    res.render('accountlist', {
        admins,
        current: page,
        pages: Math.ceil(count / perPage)
      });
};