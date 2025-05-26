const orderModel = require("../models/orderModel"); // Modelo de orden
const { responseReturn } = require("../utiles/response"); // Utilidad para respuestas
const formidable = require("formidable"); // Middleware para manejar formularios
const productModel = require("../models/productModel");
const Stripe = require("stripe");
const userModel = require("../models/userModel");
require("dotenv").config();

class OrderController {
  // Obtener categoria buscada
  checkout = async (req, res) => {
    const stripe = new Stripe(process.env.api_secret_stripe);
    const { buyerId, sellerId, productId, amount, platformCalcInsurance } =
      req.body;
    const { id } = req.body.paymentMethod;

    try {
      const product = await productModel.findById(productId);
      const buyer = await userModel.findById(buyerId);
      const seller = await userModel.findById(sellerId);

      if (!productId) {
        return responseReturn(res, 404, {
          error: "no se encontro el producto",
        });
      }
      if (!buyerId) {
        return responseReturn(res, 404, {
          error: "no se encontro el comprador",
        });
      }
      if (!sellerId) {
        return responseReturn(res, 404, {
          error: "no se encontro el vendedor",
        });
      }
      const total = amount / 100;

      const payment = await stripe.paymentIntents.create({
        amount,
        currency: "EUR",
        description: product.name,
        payment_method: id,
        confirm: true,
        automatic_payment_methods: {
          enabled: true,
          allow_redirects: "never", // 👈 esto evita los métodos que requieren redirección
        },
      });
      if (!payment) {
        return responseReturn(res, 404, {
          error: "Algo salio mal con el pago",
        });
      }

      const order = await orderModel.create({
        buyerId,
        sellerId,
        productId,
        paymentIntentId: payment.id,
        status: "succeeded",
        platformCalcInsurance,
        totalAmount: total,
        phone: buyerId.phone || "",
        shippingAddress: {
          address: buyerId.address || "",
          city: buyerId.city || "",
          province: buyerId.province || "",
          postalCode: buyerId.postalCode || "",
          country: "España",
        },
      });

      await productModel.findByIdAndUpdate(productId, {
        state: "reserved",
      });

      responseReturn(res, 201, {
        order,
        message: "Pago realizado con exito",
      });
    } catch (error) {
      if (error.type === "StripeCardError") {
        // Tarjeta rechazada (fondos insuficientes, vencida, etc.)
        return responseReturn(res, 402, { error: error.message });
      }

      if (error.type === "StripeInvalidRequestError") {
        // Error de parámetros malformados (por ejemplo, ID incorrecto)
        return responseReturn(res, 400, { error: error.message });
      }

      responseReturn(res, 500, { error: "error interno del servidor" });
    }
  };
  // End method
}

module.exports = new OrderController();
