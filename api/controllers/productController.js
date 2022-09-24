const {productService} = require('../services')
const { asyncWrap } = require('../utils/error')

const getProduct = asyncWrap(async (req,res) => {
    const { categoriesId, productId } = req.body

    const getProduct = await productService.getProductbyId(categoriesId, productId)

    res.status(200).json({getProduct})
});

const getCategory = asyncWrap(async (req,res) => {
    const { categoriesId } = req.body

    const GetCategory = await productService.getCategorybyId( categoriesId )

    res.status(200).json({GetCategory})
});

const getDescription = asyncWrap(async (req,res) => {
    const { productId } = req.body

    const getDescription = await productService.getDescriptionbyId(productId)

    res.status(200).json({getDescription})
});

module.exports = {
    getProduct,
    getCategory,
    getDescription 
}