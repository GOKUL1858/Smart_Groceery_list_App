const GroceryItem = require('../models/GroceryItem');

exports.addItem = async (req, res) => {
    try {
        const { name, quantity, category } = req.body;

        const newItem = await GroceryItem.create({
            name,
            quantity,
            category,
            user: req.user._id
        });

        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getItems = async (req, res) => {
    try {
        const items = await GroceryItem.find({ user: req.user._id });
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateItem = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await GroceryItem.findOneAndUpdate(
            { _id: id, user: req.user._id },
            req.body,
            { new: true }
        );
        if (!updated) return res.status(404).json({ message: 'Item not found' });
        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await GroceryItem.findOneAndDelete({ _id: id, user: req.user._id });
        if (!deleted) return res.status(404).json({ message: 'Item not found' });
        res.json({ message: 'Item deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
