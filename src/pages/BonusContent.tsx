import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import '../assets/css/lessons.css';
import { useRequireAuth } from "@/hooks/useRequireAuth";


const BonusContent: React.FC = () => {
    useRequireAuth();


    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>
          <div>
            <div>
              <div className="card">
                <div
                  className="card-body"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignContent: "center",
                    justifyContent: "center",
                  }}
                >
                  <h1 style={{ textAlign: "center" }}>תוכן בונוס</h1>
                  <p style={{ maxWidth: 400}}>
                    איך להתכתב עם נשים עד הפגישה , איך לבנות את הפרופיל המושלם ,
                    הורדה של כל קבצי הסטורים , ובונוסים של הרצאות והדרכות שלי על
                    מה לעשות בדייט
                  </p>
                  <button>לחץ כאן To קנה עכשיו !</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default BonusContent;




