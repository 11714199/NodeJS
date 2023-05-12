const db = require('../models');
const verifyToken = require('../services/verifyToken.js')
const user = db.user;

async function getEmployeeData(req, res, next) {
    try {
        if(req.headers.authorization && req.headers.authorization != '') {
            let token = req.headers.authorization.split(' ')[1];
            let verify = await verifyToken.verifyToken(token).then(async (responce) => {
                if(responce.exp) {
                    let data = await user.findOne({
                        where: {
                            id: req.query.employee_id
                        },
                        attributes: ['name', 'email', 'role'],
                    });
                    return res.send({ status: true, statusCode: 200, message: "Employee Data", data: data })
                } else {
                    return res.send({ status: true, statusCode: 401, message: "Token Expired", data: responce })
                }
            }).catch((err) => {
                return res.send({ status: true, statusCode: 500, message: err.message, data: err })
            });
        } else {
            return res.send({ status: true, statusCode: 401, message: "No Token Provided", data: req.headers })
        }
    } catch (err) {
        return res.send({ status: true, statusCode: 500, message: err.message, error: err })
    }
}

module.exports = {
    getEmployeeData
}