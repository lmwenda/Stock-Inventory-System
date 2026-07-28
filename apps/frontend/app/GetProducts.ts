type TProduct = {
    ProductID: number,
    SKU: string,
    ProductName: string,
    Description: string,
    Category: string,
    Price: number,
    StockCount: number,
    CreatedAt: string,
    UpdatedAt: string,
    Image: string
}

type TPayload = {
    products: TProduct[]
}

type TResponse = {
    type: string,
    payload: TPayload
}

const GetProducts = async(token: string | null): Promise<TResponse> => {
    const response = await fetch("http://localhost:5000/api/products/get/all", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: token })
    });

    const data = await response.json();

    return data;
}

export default GetProducts;