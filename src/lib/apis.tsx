
export async function getCustomerData(customerID: string) {
    try {
        const response = await fetch(
        `${import.meta.env.VITE_SUMIT_API_URL}/crm/data/getentity/`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
            Credentials: {
                CompanyID: import.meta.env.VITE_SUMIT_BUSINESS_ID,
                APIKey: import.meta.env.VITE_SUMIT_API_KEY,
            },
            EntityID: customerID,
            IncludeIncomingProperties: false,
            IncludeFields: true,
            }),
        }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "An error occurred");
        } 
        else {
            console.log("Request success!");
            console.log(data);
            return({ status:"success",data:data });
        }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.log('Error fetching customer details',error);
        return({status:'error',message:error.message})
    }
}
