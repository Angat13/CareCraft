import careModel from '../models/careModel.js'
import fs from 'fs'

// all CareTaker list
const listCare = async (req, res) => {
    try {
        const care = await careModel.find({})
        res.json({ success: true, data: care })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }

}

// add CareTaker
const addCare = async (req, res) => {

    try {
        let image_filename = `${req.file.filename}`

        const care = new careModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            image: image_filename,
            category:req.body.category
        })

        await care.save();
        res.json({ success: true, message: "CareTaker/Guitarist Added" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// delete CareTaker
const removeCare = async (req, res) => {
    try {

        const care = await careModel.findById(req.body.id);
        fs.unlink(`uploads2/${care.image}`, () => { })

        await careModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: "CareTaker/Guitarist Removed" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }

}

export { listCare, addCare, removeCare }