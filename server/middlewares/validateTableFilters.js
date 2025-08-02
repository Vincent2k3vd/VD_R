// Middleware để validate filters (optional)
const validateTableFilters = (req, res, next) => {
    const { status, type, capacity_min, capacity_max, sortBy, sortOrder, page, limit } = req.query;
    
    // Validate status
    if (status && !['available', 'occupied', 'reserved', 'maintenance'].includes(status)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid status. Valid values: available, occupied, reserved, maintenance'
        });
    }
    
    // Validate type
    if (type && !['standard', 'vip', 'private', 'outdoor'].includes(type)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid type. Valid values: standard, vip, private, outdoor'
        });
    }
    
    // Validate capacity range
    if (capacity_min && capacity_max) {
        const min = parseInt(capacity_min);
        const max = parseInt(capacity_max);
        if (isNaN(min) || isNaN(max) || min > max) {
            return res.status(400).json({
                success: false,
                message: 'Invalid capacity range. capacity_min must be less than or equal to capacity_max'
            });
        }
    }
    
    // Validate individual capacity values
    if (capacity_min && (isNaN(parseInt(capacity_min)) || parseInt(capacity_min) < 1)) {
        return res.status(400).json({
            success: false,
            message: 'capacity_min must be a positive number'
        });
    }
    
    if (capacity_max && (isNaN(parseInt(capacity_max)) || parseInt(capacity_max) < 1)) {
        return res.status(400).json({
            success: false,
            message: 'capacity_max must be a positive number'
        });
    }
    
    // Validate sort fields
    const validSortFields = ['id', 'name', 'capacity', 'price', 'status', 'type', 'created_at', 'updated_at'];
    if (sortBy && !validSortFields.includes(sortBy)) {
        return res.status(400).json({
            success: false,
            message: `Invalid sortBy field. Valid values: ${validSortFields.join(', ')}`
        });
    }
    
    if (sortOrder && !['ASC', 'DESC', 'asc', 'desc'].includes(sortOrder)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid sortOrder. Use ASC or DESC'
        });
    }
    
    // Validate pagination
    if (page && (isNaN(parseInt(page)) || parseInt(page) < 1)) {
        return res.status(400).json({
            success: false,
            message: 'page must be a positive number'
        });
    }
    
    if (limit && (isNaN(parseInt(limit)) || parseInt(limit) < 1 || parseInt(limit) > 100)) {
        return res.status(400).json({
            success: false,
            message: 'limit must be a number between 1 and 100'
        });
    }
    
    next();
};

module.exports = validateTableFilters;