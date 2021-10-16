import express from 'express';
const router = express.Router();

// importar el modelo nota
import Products from '../models/products';

//MÉTODO POST Agregar una nota
router.post('/new-product', async (req, res) => {

    const body = req.body;
    try {
        const productDB = await Products.create(body);
        res.status(200).json(productDB);

    } catch (error) {

        return res.status(500).json({
            mensaje: "Ocurrio un error",
            error

        });

    }
})

//MÉTODO GET obtener una nota
router.get('/products/:id', async (req, res) => {

    const _id = req.params.id;
    try {

        const productDB = await Products.findOne({ _id });
        res.json(productDB);

    } catch (error) {
        return res.status(400).json({
            mensaje: "Ocurrio un error",
            error
        });
    }
});


// Get con todos los documentos
router.get('/products', async (req, res) => {
    try {
        const productDB = await Products.find(); 
        res.json(productDB);
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error', 
            error
        })
    }
});


// Delete eliminar una nota
router.delete('/products/:id', async (req, res) => {

    const _id = req.params.id;
    try {
        const productDB = await Products.findByIdAndDelete({ _id });
         if (!productDB) {
            return res.status(400).json({
                mensaje: 'No se encontró el id indicado', 
                error
            })
        }
        res.json(productDB);
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error', 
            error
        })
    }
});


// Put actualizar una nota
router.put('/products/:id', async(req, res) => { 
    const _id = req.params.id;
    const body = req.body; 
    try {
        const productDB = await Products.findByIdAndUpdate(_id,body,{new: true}); 
        res.json(productDB);
    }catch (error) {
        return res.status(400).json({ 
            mensaje: 'Ocurrio un error', 
            error
        })
    } 
});

// Exportamos la configuración de express app
module.exports = router;