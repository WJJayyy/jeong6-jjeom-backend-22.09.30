const appDataSource = require('./datasource') 

const getOrderInfo = async(userId, cartId)=>{
    const result = await appDataSource.query(
        `
            SELECT 
                u.name,
                u.phone_number,
                u.email,
                p.name,
                p.standard_unit,
                p.price,
                op.thick,
                c.quantity
                u.id
            FROM product p
            JOIN option_products op
            ON p.id = op.id
            JOIN carts c
            ON c.option_products_id = op.id 
            JOIN users u
            ON u.id = c.users_id
            WHERE
            u.id = ?
            AND
            c.id IN (?)
        `,[userId, cartId]
    )
    return result   
}

const getCompleteInfo =async(userId, orderId)=>{
    const result = await appDataSource.query(
        `
        SELECT 
            o.deposit_deadline,
            o.quantity,
            p.price
        FROM orders o
        JOIN delivery_information di
        ON o.delivery_information_id = di.id
        JOIN users u
        ON u.id = di.users_id
        JOIN order_products op
        ON o.id = op.order_id
        JOIN option_products opp
        on opp.id = op.order_products_id  
        join product p
        on opp.product_id = p.id
        where u.id = ?
        AND o.id in (?)
        `, [userId, orderId]
    )
    return result 
}


//  이러면 쿼리문으로
const getCompleteInfotwoo = async(userId) => {
    const result = await appDataSource.query(
        `SELECT
            delivery_information.arrival_date,
            orders.quntity,
            p.price
        FROM orders o
        JOIN delivery_information di
        ON o.delivery_information_id = di.id
        JOIN users u
        ON u.id = di.users_id
        JOIN order_products op
        ON o.id = op.order_id
        JOIN option_products opp
        ON opp.id = op.option_products_id
        JOIN products p
        ON p.id = opp.product_id
        where u.id = ?
        AND o.created_at = 
        `, [userId]
     )
     return result
}


module.exports = {
    getOrderInfo,
    getCompleteInfo
}