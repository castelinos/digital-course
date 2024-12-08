import { PAGE_COUNT } from "./constants";

interface LoginAPIProps{
    username:string;
    password:string;
}

interface OrderProps {
  email: string;
  orderID: string;
  customerID: string;
  paymentID: string;
  contact?: string;
  name?: string;
}

interface getUsersProps{
  searchTerm: string;
  page: number;
  sort: 'asc' | 'desc';
}

export async function getCustomerData( customerID: string ) {
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
        });

        const data = await response.json();

        if (response.ok) {
            return { status: "success", data: data.Data.Entity };
        } 
        else {
            throw new Error(data.message || "An error occurred");
        }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.log('Error fetching customer details',error);
        return({status:'error', message:error.message})
    }
}

export async function loginUser({ username, password }:LoginAPIProps) {
   try {
      const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
          return ({status:"success", message:data.message });
      }
      else{
          throw new Error(data.message || "An error occurred");
      }
    
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   } catch ( error:any ) {
        console.log('Error in login API request',error.message);
        return({status:"error", message: error.message});
   }
 }

export async function registerUser(username: string, password: string) {
    try {
        const response = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/register`,
        {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
            return({status:"success",message:data.message});
        }
        else{
            throw new Error(data.message);
        }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error("Error during registration:", error);
        return({status:"error", message: error.message})
    }
}

export async function createOrder({email,orderID,customerID,paymentID,contact,name}:OrderProps) {
  try {
    const body = {
      email,
      order_id: orderID,
      customer_id: customerID,
      payment_id: paymentID,
    };
     
    if( contact && contact.trim() ) Object.assign(body, {contact});

    if (name && name.trim()) Object.assign(body, { name });
    
    const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (response.ok) {
      return { status: "success", message: data.message };
    } else {
      throw new Error(data.message);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error during registration:", error);
    return { status: "error", message: error.message };
  }
}

export async function getUserOrders( email: string ) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_APP_API_URL}/orders/?username=${email}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      }
    );

    const data = await response.json();

    if (response.ok) {
      return { status: "success", data: data };
    } else {
      throw new Error(data.message || "An error occurred");
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return { status: "error", message: error.message };
  }
}

export async function getUsers({ searchTerm, page, sort }: getUsersProps) {
  try {
    const pageSize = PAGE_COUNT.toString();
    const url = new URL(`${import.meta.env.VITE_APP_API_URL}/users`);

    if( searchTerm ) url.searchParams.append("username", searchTerm.trim());
    if( page ) url.searchParams.append("page", page.toString());
    if( sort ) url.searchParams.append("sort", sort);
    url.searchParams.append("limit",pageSize);

    const response = await fetch(url,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      }
    );

    const data = await response.json();

    if (response.ok) {
      return { status: "success", data: data };
    } else {
      throw new Error(data.message || "An error occurred");
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return { status: "error", message: error.message };
  }
}
