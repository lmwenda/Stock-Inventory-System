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

const GetProduct = async(id: string, token: string | null): Promise<TProduct> => {
    const response = await fetch(`http://localhost:5000/api/products/get/${id}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token })
    });

    const data = await response.json();
    console.log(data);

    return data.payload.product;
};

export default GetProduct;