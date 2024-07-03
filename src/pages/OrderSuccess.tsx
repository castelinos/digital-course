import { getCustomerData, registerUser } from "@/lib/apis";
import { CheckCircle, ErrorOutline } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  CssBaseline,
  Typography
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "@/assets/css/orders.css";

const OrderSuccess: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [details,setDetails]=useState({status:"error",message:"Bad Request"});
  const params = new URL(window.location.href).searchParams;
  const customerID = params.get("OG-CustomerID");

  useEffect(() => {

    if ( !customerID ) {
      alert("נתוני בקשה שגויים");
      return;
    }
    processOrderInformation(customerID)

    return () => {};
  }, []);

  async function processOrderInformation(customerID: string) {
    try {
      setIsLoading(true);
      if (!customerID) throw new Error("נתוני בקשה שגויים");
      let result = await getCustomerData(customerID);
      setDetails({ status: result.status, message: "האימות הצליח" });

      if (result.status !== "success") throw new Error("לא ניתן היה לאמת את התשלום");
      const { Customers_EmailAddress: emails } = result.data;

      const email = emails[0];
      if (!email) throw new Error("לא נמצא אימייל");

      result = await registerUser(email, "GENERATE_PASSWORD");
      if (result.status !== "success") throw new Error("רישום המשתמש נכשל");

      setDetails(result);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
      console.log("Error in order processing", error);
      setDetails({status:"error",message:error.message})
    }
    finally{
      setIsLoading(false);
    }
  }

  return (
    <div className="orderContainer">
      <Container maxWidth="xs" className="orderSubContainer">
        <CssBaseline />
        <Box
          sx={{
            mt: 2,
            py: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {isLoading ? (
            <CircularProgress sx={{ color: "orange" }} />
          ) : details["status"] === "success" ? (
            <Avatar
              sx={{
                width: 80,
                height: 80,
                m: 2,
                bgcolor: "primary.light",
                backgroundColor: "#ff8d41",
              }}
            >
              <CheckCircle sx={{ width: 60, height: 60 }} />
            </Avatar>
          ) : (
            <Avatar
              sx={{
                width: 80,
                height: 80,
                m: 2,
                bgcolor: "primary.light",
                backgroundColor: "#ff8d41",
              }}
            >
              <ErrorOutline sx={{ width: 70, height: 70 }} />
            </Avatar>
          )}

          {isLoading && (
            <Typography variant="h6" sx={{ color: "white", mt: 2, mb: 4 }}>
              בודק להזמין פרטים...
            </Typography>
          )}

          {!isLoading &&
            (details["status"] === "success" ? (
              <Typography variant="h6" sx={{ color: "white", mt: 2, mb: 4 }}>
                להזמין מְאוּשָׁר
              </Typography>
            ) : (
              <Typography variant="h6" sx={{ color: "white", mt: 2, mb: 4 }}>
                {details["message"]}
              </Typography>
            ))}

          {!isLoading &&
            (details["status"] === "success" ? (
              <Typography
                variant="h6"
                sx={{ fontSize: 16, color: "gray", textAlign: "center" }}
              >
                תודה על ביצוע ההזמנה. תקבל את הקישור לקורס ופרטי התחברות בדוא"ל
                הרשום שלך
              </Typography>
            ) : (
              /* Please contact administrator for further details */
              <Typography
                variant="h6"
                sx={{ fontSize: 16, color: "gray", textAlign: "center" }}
              >
                אנא פנה למנהל המערכת לפרטים נוספים
              </Typography>
            ))}

          {!isLoading && (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 10 }}
              color="warning"
            >
              המשך לאתר
            </Button>
          )}
        </Box>
      </Container>
    </div>
  );
};

export default OrderSuccess;
