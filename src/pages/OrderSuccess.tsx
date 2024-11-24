import { createOrder, getCustomerData, registerUser } from "@/lib/apis";
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
import { useParams } from "react-router-dom";
import { ordersList } from "@/lib/constants";
import Modal from "@/components/Modal";
import ReactPlayer from "react-player";

interface userOrder {
  id:string;
  orderName:string;
}

const OrderSuccess: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [details,setDetails]=useState({status:"error",message:"Bad Request"});
  const { order } = useParams();

  const params = new URL(window.location.href).searchParams;
  const customerID = params.get("OG-CustomerID");
  const paymentID = params.get("OG-PaymentID");

  const userOrder = ( order ) ? Object.values(ordersList).find( val => val.id === order ) : null;
  const [showAd, setShowAd] = useState(false); 

  useEffect(() => {
    if ( !customerID || !userOrder || !paymentID ) {
      alert("נתוני בקשה שגויים");
      return;
    }
    processOrderInformation(customerID, paymentID, userOrder);

    return () => {};
  }, []);

  async function processOrderInformation( customerID: string, paymentID:string, order:userOrder ) {
    try {
      setIsLoading(true);
      if ( !customerID || !order ) throw new Error("נתוני בקשה שגויים");
      const { id, orderName } = order;

      let result = await getCustomerData(customerID);
      setDetails({ status: result.status, message: "האימות הצליח" });

      if (result.status !== "success") throw new Error("לא ניתן היה לאמת את התשלום");
      const {
        Customers_EmailAddress: emails,
        Customers_FullName: names,
        Customers_Phone: contacts
      } = result.data;

      const email = emails[0];
      if (!email) throw new Error("לא נמצא אימייל");

      if( orderName === 'BASIC' ){
        result = await registerUser(email, "GENERATE_PASSWORD");
        if (result.status !== "success") throw new Error("רישום המשתמש נכשל");
        setDetails(result);
      }

      result = await createOrder({
        email: email,
        orderID: id,
        customerID: customerID,
        paymentID: paymentID,
        contact:contacts[0],
        name:names[0]
      });

      setDetails(result);

      if( result.status === 'success' ){
        setTimeout(()=> setShowAd(true),1000);
      }

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
          component="form"
          sx={{
            mt: 2,
            py: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          onSubmit={(event) => {
            event.preventDefault();

            const orderName = ( userOrder && userOrder['orderName'] ) ? userOrder['orderName'] : 'default'
            switch( orderName ){
              case 'BASIC':
                window.location.replace(
                  import.meta.env.VITE_LANDING_PAGE_URL +
                    "?show_promotion=bonus_content"
                );
                break;
              case 'BONUS_CONTENT':
                window.location.replace(`${import.meta.env.VITE_COURSE_APP_URL}/login`);
                break;
              default:
                window.location.replace(import.meta.env.VITE_LANDING_PAGE_URL);
            }
            
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

      { 
        <Modal showModal={showAd} toggleShowModal={setShowAd} backgroundTheme="dark">
          <div className="modal-content p-0">
					<div className="modal-header border-bottom border-white">
						<h3 className="modal-title text-center flex-grow-1 fs-3 mb-2">זאת הצעה חד פעמית
							שלא תחזור יותר</h3>
					</div>

					<div className="modal-body p-4">
            <ReactPlayer 
              url={["/Videos/bonus-content-promo.mp4","/Vidoes/bonus-content-promo.mkv"]} 
              playing
              controls
              muted
              width='100%'
              height='100%'
              />
						<div className="text-center fs-4">
							זוהי הדרך המהירה ביותר להגיע מההתכתבות לדייט ולהפוך את התהליך הזה של
							לצאת עם דוגמניות מהאינסטגרם למשהו פשוט ואוטומטי אל תוותר על עצמך
						</div>
					</div>

					<div className="modal-footer justify-content-center pb-4 border-top border-white">
						<button type="button" data-bs-dismiss="modal"
							onClick={()=>{ 
                window.location.href = import.meta.env.VITE_BONUS_CONTENT_PAY_URL;
              }}
							className="btn btn-warning fs-3 mt-4 align-middle">תקנה את זה עכשיו</button>
					</div>
				</div>
        </Modal>
      }
    </div>
  );
};

export default OrderSuccess;
