const { responseReturn } = require("../utiles/response"); // Utilidad para respuestas
const formidable = require("formidable"); // Middleware para manejar formularios
const cloudinary = require("cloudinary").v2; // Librería para manejar Cloudinary

class productController {
    
    add_product = async (req, res) => {
        const form = formidable({ multiples: true });

        form.parse(req, async (err, fields, files) => {
            if (err) {
                console.error("Error parsing the form:", err);
                return res.status(400).json({ error: "Error parsing the form" });
            }

            console.log("Files:", files.images[0]);
            console.log("Fields:", fields);

           
            res.status(200).json({ message: "Form parsed successfully", fields, files });
        });
    };
    //End method
}

module.exports = new productController();