export const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Ошибка сервера',
        error: err.message
    });
};
