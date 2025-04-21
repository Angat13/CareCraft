import medicineModel from '../models/medicineModel.js'
import fs from 'fs'

// all Medicine
const listmed = async (req, res) => {
    try {
        const care = await medicineModel.find({})
        res.json({ success: true, data: care })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }

}

// add Medicine
const addmed = async (req, res) => {

    try {
        let image_filename = `${req.file.filename}`

        const care = new medicineModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category:req.body.category,
            image: image_filename,
        })

        await care.save();
        res.json({ success: true, message: "Medicine Added" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// delete Medicine
const removemed= async (req, res) => {
    try {

        const food = await medicineModel.findById(req.body.id);
        fs.unlink(`uploads1/${food.image}`, () => { })

        await medicineModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: "Medicine Removed" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }

}

export { listmed, addmed, removemed }