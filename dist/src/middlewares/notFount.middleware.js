export const notFound = (req, res) => {
    res.status(404).json({
        message: "Route Not Found",
        path: req.originalUrl,
        data: Date(),
    });
};
//# sourceMappingURL=notFount.middleware.js.map