import $host from "."

export const createCheckout = async (
                                full_name, 
                                phone_number, 
                                region, 
                                town, 
                                address, 
                                comment, 
                                cart, 
                                pay_status, 
                                naxt_status, 
                                userId,
                                total_price) => {
    try {
        const data = $host.post("checkout/checkout/", {
            full_name,
            phone_number,
            region,
            town,
            address,
            comment,
            cart,
            PAY_STATUS: pay_status,
            NAXT_STATUS: naxt_status,
            user: userId,
            amount: total_price,
        });

        return data;
    } catch(e) {
        console.log(e);
    }
}