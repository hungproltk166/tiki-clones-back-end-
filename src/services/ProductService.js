const Product = require('../models/ProductModel');


const createProduct = (newProduct) => {
    return new Promise(async (resolve, reject) => {
        const { name, image, type, price, countInStock, rating, description } = newProduct
        try {
            const checkProduct = await Product.findOne({
                name: name
            })
            if (checkProduct !== null) {
                resolve({
                    status: "ok",
                    message: "The name of product is already",
                })
            }

            const newProduct = await Product.create({
                name,
                image,
                type,
                price,
                countInStock,
                rating,
                description
            })

            if (newProduct) {
                resolve({
                    status: 'Ok',
                    message: "User created successfully",
                    data: newProduct
                })
            }
        } catch (err) {
            reject(err);
        }
    })
}

const updateProduct = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({ _id: id });

            if (checkProduct === null) {
                resolve({
                    status: "ok",
                    message: "sản phẩm không tồn tại",
                })
            }

            const updatedProduct = await Product.findByIdAndUpdate(id, data, { new: true });

            resolve({
                status: 'Ok',
                message: "Thành công",
                data: updatedProduct
            })
        } catch (err) {
            reject(err);
        }
    })
}

const deleteProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({ _id: id });

            if (checkProduct === null) {
                resolve({
                    status: "ok",
                    message: "sản phẩm không tồn tại",
                })
            }

            await Product.findByIdAndDelete(id);

            resolve({
                status: 'Ok',
                message: "xóa sản phẩm thành công",
            })
        } catch (err) {
            reject(err);
        }
    })
}

const getAllProduct = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allUProduct = await Product.find();

            resolve({
                status: 'Ok',
                message: "Thành công",
                data: allUProduct
            })
        } catch (err) {
            reject(err);
        }
    })
}

const getDetailsProduct = (id) => {

    return new Promise(async (resolve, reject) => {
        try {
            const product = await Product.findOne({ _id: id });

            if (product === null) {
                resolve({
                    status: "ok",
                    message: "sản phẩm không tồn tại",
                })
            }
            resolve({
                status: 'Ok',
                message: "Thành công",
                data: product
            })
        } catch (err) {
            reject(err);
        }
    })
}


module.exports =
{
    createProduct,
    updateProduct,
    getDetailsProduct,
    deleteProduct,
    getAllProduct

}
