
export async function addbooksdetails(req, res, next){
    try{
        const req_external_api = await fetch("https://dummyjson.com/products");
        const get_data = await req_external_api.json();
        res.locals.data = get_data;
        next();
    }
    catch(error){
        res.locals.data = undefined;
        next();
    }
};