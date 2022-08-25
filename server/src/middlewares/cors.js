module.exports = () => (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'get, post, put, delete, head, options');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');


    next();
}