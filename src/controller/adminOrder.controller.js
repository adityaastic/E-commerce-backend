const orderService = require("../services/orderService.js");

const getAllOrders = async (req, res) => {
    try {
        const orders = await orderService.getAllOrders();
        return res.status(200).send(orders);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

const confirmedOrder = (req, res) => {
    try {
      const orderId = req.params.orderId;
      const order = orderService.confirmedOrder(orderId);
      res.status(202).json(order);
    } catch (error) {
      res.status(500).json({ error: "Something went wrong" });
    }
  };

const shipOrder = async (req, res) => {
    const orderId = req.params.orderId;
    try {
        const orders = await orderService.shipOrder(orderId);
        return res.status(200).send(orders);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

const deliverOrder = async (req, res) => {
    const orderId = req.params.orderId;
    try {
        const orders = await orderService.deliverOrder(orderId);
        return res.status(200).send(orders);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

const cancelOrder = async (req, res) => { // Renamed from `cancelledOrder` to `cancelOrder`
    const orderId = req.params.orderId;
    try {
        const orders = await orderService.cancelOrder(orderId); // Renamed from `cancelledOrder` to `cancelOrder`
        return res.status(200).send(orders);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

const deleteOrder = async (req, res) => {
    const orderId = req.params.orderId;
    try {
        const orders = await orderService.deleteOrder(orderId);
        return res.status(200).send(orders);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

module.exports = {
    getAllOrders,
    shipOrder,
    confirmedOrder,
    deliverOrder,
    cancelOrder, // Renamed from `cancelledOrder` to `cancelOrder`
    deleteOrder
};
