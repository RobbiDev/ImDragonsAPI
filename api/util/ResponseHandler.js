/**
 * Sends a success response with a specified status code and data object.
 *
 * @param {Object} res - The Express response object.
 * @param {number} code - The HTTP status code.
 * @param {Object} obj - The data object to include in the response.
 */
export function Success(res, code, obj) {
    const body = {
        "api": "ImDragonsAPI",
        "Status": code,
        "data": obj
    };

    res.status(code).json(body);
}

/**
 * Sends an error response with a specified status code and message.
 *
 * @param {Object} res - The Express response object.
 * @param {number} code - The HTTP status code.
 * @param {string} message - The error message to include in the response.
 */
export function Error(res, code, message = 'No Such Data route could be found. Please Look back at available routes') {
    const body = {
        "api": "ImDragonsAPI",
        "Status": code,
        "message": message
    };

    res.status(code).json(body);
}