const crypto = require('crypto');
const secret = process.env.SECRET_KEY;
// webhook controller
const webhook = (req, res) => {
    //validate event
    const event = req.body;
    console.log(event);
    const hash = crypto.createHmac('sha512', secret).update(JSON.stringify(req.body)).digest('hex');
    if (hash == req.headers['x-paystack-signature']) {
        // Retrieve the request's body
        const event = req.body;
        console.log(event);
        // Do something with event  
    }
    res.sendStatus(200);
}

// export webhook controller

module.exports = webhook;