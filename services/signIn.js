const db = require('../models');
const jwt = require('jsonwebtoken');
const user = db.user;
const crypto = require('crypto');

async function login(req, res, next) {
    try {
        await user.findOne({
            where: {
                email: req.body.email
            }
        }).then(data => {
            if(data) {
                if(data.password != req.body.password) {
                    res.send({ staus: false,statusCode: 403, message: "Password mismatch" })
                } else {
                    let token = jwt.sign({ email: req.body.email }, process.env.SECRETE_KEY, { expiresIn: 60*60 });
                //     const algorithm = 'aes-192-cbc';
                //     const key = crypto.randomBytes(24);
                //     const iv = Buffer.alloc(16, 0); // Initialization vector.
                //     const cipher = crypto.createCipheriv(algorithm, key, iv); //`{"user":[{"role":"${this.params.userRole}","org_id":"${data.id}"}]}`
                //     let dataToEncrypt =`{"email":"${req.body.email}","password":"${req.body.password}"}`
                //    // dataToEncrypt1 = Buffer.from(JSON.stringify(dataToEncrypt))
                //     let encryptedData = cipher.update(dataToEncrypt);
                //     encryptedData = Buffer.concat([encryptedData, cipher.final()]);
                //     const encryptedStirngData = encryptedData.toString('hex');
                    let response = { id: data.id, status: true, statusCode: 200, message: "User logged in successfuly", token: token }
                    res.send({data: response})
                }
            } else {
                res.send({ staus: false,statusCode: 404, message: "User not exist" })
            }
        }).catch(err => {
            console.log(err)
        })
        
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    login
}