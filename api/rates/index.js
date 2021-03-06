const { v4: uuidv4 } = require('uuid');
const loremIpsum = require("lorem-ipsum").loremIpsum;

module.exports = async function (context, req) {
    context.log('HTTP trigger function processed a request.');
    context.log({
        query: req.query
    });
    const key = req.query.key;
    const quantity = Math.min(parseInt(req.query.quantity, 10), 30000);

    if ( key !== '123' || !quantity || isNaN(quantity) || quantity < 0) {

        context.res = {
            status: 500,
            body: { success: false, error: "Ooops" },
        };
        return;
    }

    const tmpArr = new Array(quantity).fill('');

    const dataArr = tmpArr.map((_, indx) => {
        const value = Math.floor(Math.random() * 10000) / 10;

        return {
            id: `id_${indx}`,
            name: `name_${indx}`,
            betaId: uuidv4(),
            value,
            subValue: Math.floor(Math.random() * 10000) / 10,
            currency: (value % 2 === 0) ? "USD" : "EURO",
            timestamp: Date.now(),
            description: loremIpsum(),
        }
    })


    context.res = {
        // status: 200, /* Defaults to 200 */
        body: { success: true, data: dataArr, quantity },

    };
    return;
}