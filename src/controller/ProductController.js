const ProducService = require('../services/ProductService')


const createProduct = async (req, res) => {
    try {

        const { name, image, type, price, countInStock, rating, description } = req.body
        if (!name || !image || !type || !price || !countInStock || !rating) {
            return res.status(200).json({
                status: "Error",
                message: "The input is reqired"
            })
        }

        const response = await ProducService.createProduct(req.body)
        return res.status(200).json(response)
    } catch (err) {
        return res.status(404).json({ message: err });
    }
}



const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id
        const data = req.body
        if (!productId) {
            return res.status(200).json({ status: "err", message: "productId is required" })
        }

        const response = await ProducService.updateProduct(productId, data)
        return res.status(200).json(response)
    } catch (err) {
        return res.status(404).json({ message: err });
    }
}


const getDetailsProduct = async (req, res) => {
    try {
        const productId = req.params.id
        if (!productId) {
            return res.status(200).json({ status: 'ERR', message: "The product is required" })
        }

        const response = await ProducService.getDetailsProduct(productId)
        return res.status(200).json(response)
    } catch (err) {
        return res.status(404).json({ message: err });
    }
}

const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id
        if (!productId) {
            return res.status(200).json({ status: 'ERR', message: "The productId is required" })
        }

        const response = await ProducService.deleteProduct(productId)
        return res.status(200).json(response)
    } catch (err) {
        return res.status(404).json({ message: err });
    }
}

const getAllProduct = async (req, res) => {
    try {
        const response = await ProducService.getAllProduct()
        return res.status(200).json(response)
    } catch (err) {
        return res.status(404).json({ message: err });
    }
}


module.exports =
{
    createProduct,
    updateProduct,
    getDetailsProduct,
    deleteProduct,
    getAllProduct
}