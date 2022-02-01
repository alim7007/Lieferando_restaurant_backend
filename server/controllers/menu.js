const Menu = require('../models/menu');
const { cloudinary } = require("../cloudinary");



module.exports.index = async (req, res) => {
    const menu = await Menu.find({})
        .populate('category')
        .populate('ingridients')
        .populate('sous')
    res.json(menu);
}

module.exports.renderNewForm = (req, res) => {
    res.render('menu/new');
}

module.exports.createMenu = async (req, res, next) => {
    const menu = new Menu(req.body.menu);
    menu.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
    await menu.save();
    console.log(menu);
    res.redirect(`/menu/${menu._id}`)
}


module.exports.showMenu = (req, res,) => {
    const menu = Menu.findById(req.params._id, (err, data) => {
        if (err) {
            return handleError(res, err);
        }
        if (!data) {
            return res.status(404);
        }
        return res.json(data);
    });
}


module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const menu = await Menu.findById(id)
    if (!menu) {

        return res.redirect('/menu');
    }
    res.render('menu/edit', { menu });
}

module.exports.updateMenu = async (req, res) => {
    const { id } = req.params;
    console.log(req.body);
    const menu = await Menu.findByIdAndUpdate(id, { ...req.body.menu });
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
    menu.images.push(...imgs);
    await menu.save();
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        await menu.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } })
    }

    res.redirect(`/menu/${menu._id}`)
}

module.exports.deleteMenu = async (req, res) => {
    const { id } = req.params;
    await Menu.findByIdAndDelete(id);
    res.redirect('/menu');
}