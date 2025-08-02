const validateTableId = (req, res, next) => {
    const { id } = req.params;
    
    if (isNaN(parseInt(id)) || parseInt(id) < 1) {
        return res.status(400).json({
            success: false,
            message: 'Invalid table ID. ID must be a positive number'
        });
    }
    
    next();
};

module.exports = validateTableId;