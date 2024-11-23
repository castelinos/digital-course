import React, { useState, useEffect } from "react";
import NavBar from "@/components/navbar";
import Logo from "../assets/animated.png";
import "bootstrap/dist/css/bootstrap.css";
import "../assets/css/lessons.css";
import VideoPlayer from "@/components/VideoPlayer";
import MentorProfile from "@/assets/mentorProfile.jpg";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { Button } from "@mui/material";
import { useResponsive } from "@/context/PlatformContext";
import { useNavigate } from "react-router-dom";
import { getUserOrders } from "@/lib/apis";
import { useAuth } from "@/context/AuthContext";

import lessonsList from "@/data/lesson";
import Modal from "@/components/Modal";

interface NavBarItems {
  brandName: string;
  imageSrcPath: string;
  navItems: string[];
}

const navBarItems: NavBarItems = {
  brandName: "Female-Dynamics",
  imageSrcPath: Logo,
  navItems: ["עמוד הבית", "שיעורים", "קצת עלינו"],
};

function getAlbumName( id: number ){
  return 'album' + id;
}

const Lessons: React.FC = () => {
  useRequireAuth();
  const navigate = useNavigate();
  const [chosenAlbum, setChosenAlbum] = useState<number>(1);
  const [chosenLesson, setChosenLesson] = useState<string>(lessonsList[getAlbumName(chosenAlbum)][0].url);
  const { isDesktopOrLaptop, isTabletOrMobile } = useResponsive();
  const [orders,setOrders] = useState([{orderName:'',createdAt:null}]);
  const { user } = useAuth();
  const [showModal, toggleShowModal] = useState(false);
  // const [isMentorMenuOpen, setIsMentorMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    if( user && user['username'] ){
      handleOrderData(user['username']);
    }
  }, []);

  const showBonus = orders.some((val) => val.orderName === "BONUS_CONTENT");

  async function handleOrderData( email: string ){
    const result = await getUserOrders(email);
    if( result.status === "success"){
      setOrders(result.data);
    }
  }

  const album = getAlbumName(chosenAlbum);
  const filteredLessons = lessonsList[album];

  const renderedLessons = filteredLessons.map((lesson,index)=>{
    return (
      <div key={ index } className="lessonItem" onClick={() => handleLessonClick( lesson.url )} >
        <img src={lesson.preview} alt="" className="lessonItemImg" />
        {
          lesson.isCurrentlyPlaying ? (
            <h1 className="lessonItemPlaying">מתנגן עכשיו</h1>
          ) : (
            <h1 className="lessonItemIsntPlaying">{lesson.text}</h1>
          )
        }
        <h1 className="lessonItemText">{lesson.title}</h1>
      </div>
    );
  });

  const handleLessonClick = ( url: string ) => {
    setChosenLesson(url);
    
    filteredLessons.map((lesson)=>{
      if( url === lesson.url && !lesson.isCurrentlyPlaying ) {
        lesson.isCurrentlyPlaying = true
      }
      else{
        lesson.isCurrentlyPlaying = false
      }

      return lesson;
    })
  };

  const scheduleMetting = () => {
    window.location.href = "https://calendly.com/d/cn54-33m-5sj/femaledynamics";
  };

  return (
    <>
      {isDesktopOrLaptop && (
        <div>
          <NavBar {...navBarItems} />
          <div className="courseContainer">
            <div className="subCourseContainer">
              <h1 className="topHeaderText">
                הצלחה עם נשים ברשתות חברתיות - באינסטגרם וטינדר
              </h1>
              <div className="courseVideosConatiner">
                {/* {isMentorMenuOpen ? */}
                <div className="meetingContainer">
                  <img src={MentorProfile} alt="" className="meetingImg" />
                  <h1 className="meetingHeader">היי, כאן המנטור שלך</h1>
                  <h1 className="meetingSubHeader">מוכן להתחיל?</h1>
                  <h1 className="meetingText">
                    מגיעה לך פגישת ייעוץ של כחצי שעה עם אחד מאנשי הצוות, לחץ כאץ
                    כדי לקבוע אותה
                  </h1>
                  <Button
                    variant="contained"
                    color="warning"
                    onClick={scheduleMetting}
                  >
                    !קבע פגישה
                  </Button>
                </div>
                <div className="videoConatiner">
                  <VideoPlayer url={chosenLesson} />
                </div>
                <div className="coursesList">
                  <h1 className="coursesListHeader">
                    אלבום <span>{chosenAlbum}</span>
                  </h1>
                  <h1 className="coursesListSubHeader">
                    שיעורים: <span>{filteredLessons.length}</span>
                  </h1>
                  {renderedLessons}
                </div>
              </div>
              <h1 className="trademarkText">
                כל הפצה או שימוש בסרטונים עלולה להיות כרוכה בהליכים משפטיים
                ,female-fynamics כל הזכויות שמורות לחברת
              </h1>
              <div className="moveAlbum">
                <h1 className="albumMoveHeader">עבור לאלבום אחר</h1>
                <div className="moveAlbumHeader">
                  {!showBonus ? (
                    <div
                      className="albumMove"
                      onClick={() => { toggleShowModal(true); }}
                    >
                      <div className="lockedAlbum">
                        <img
                          src={filteredLessons[0].preview}
                          alt=""
                          className="albumItemImg"
                        />
                        <div className="lockedAlbumBackground">
                          <svg
                            className="lockIcon"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 2C9.79 2 8 3.79 8 6V8H6C4.9 8 4 8.9 4 10V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V10C20 8.9 19.1 8 18 8H16V6C16 3.79 14.21 2 12 2ZM10 6C10 4.9 10.9 4 12 4C13.1 4 14 4.9 14 6V8H10V6ZM6 10H18V20H6V10Z"
                              fill="currentColor"
                            />
                          </svg>
                        </div>
                      </div>
                      <h1 className="albumItemText">אלבום 3</h1>
                    </div>
                  ) : (
                    <div
                      className="albumMove"
                      onClick={() => {
                        setChosenAlbum(3);
                      }}
                    >
                      <img
                        src={filteredLessons[0].preview}
                        alt=""
                        className="albumItemImg"
                      />
                      <h1 className="albumItemText">אלבום 3</h1>
                    </div>
                  )}

                  <div className="albumMove" onClick={() => setChosenAlbum(2)}>
                    <img
                      src={filteredLessons[0].preview}
                      alt=""
                      className="albumItemImg"
                    />
                    <h1 className="albumItemText">אלבום 2</h1>
                  </div>
                  <div className="albumMove" onClick={() => setChosenAlbum(1)}>
                    <img
                      src={filteredLessons[0].preview}
                      alt=""
                      className="albumItemImg"
                    />
                    <h1 className="albumItemText">אלבום 1</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isTabletOrMobile && (
        <>
          <div className="courseContainerMobile">
            <div className="subCourseContainerMobile">
              <h1 className="topHeaderText" style={{ textAlign: "center" }}>
                הצלחה עם נשים ברשתות חברתיות - באינסטגרם וטינדר
              </h1>
              <div className="courseVideosConatinerMobile">
                <div className="videoConatinerMobile">
                  <VideoPlayer url={chosenLesson} />
                </div>
                <div className="coursesListMobile">
                  <h1 className="coursesListHeader">
                    אלבום <span>{chosenAlbum}</span>
                  </h1>
                  <h1 className="coursesListSubHeader">
                    שיעורים: <span>{filteredLessons.length}</span>
                  </h1>
                  {renderedLessons}
                </div>
              </div>
              <hr />
              <h1 className="trademarkTextMobile">
                כל הזכויות שמורות לחברת female-dynamics
              </h1>
              <h1 className="trademarkTextMobile">
                כל הפצה או שימוש בסרטונים עלולה להיות כרוכה בהליכים משפטיים
              </h1>
              <hr />
              <div className="moveAlbum">
                <h1 className="albumMoveHeader">עבור לאלבום אחר</h1>
                <div className="moveAlbumHeader">
                  {!showBonus ? (
                    <div
                      className="albumMove"
                      onClick={() => {
                        navigate("/bonus-content");
                      }}
                    >
                      <div className="lockedAlbum">
                        <img
                          src={filteredLessons[0].preview}
                          alt=""
                          className="albumItemImg"
                        />
                        <div className="lockedAlbumBackground">
                          <svg
                            className="lockIcon"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 2C9.79 2 8 3.79 8 6V8H6C4.9 8 4 8.9 4 10V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V10C20 8.9 19.1 8 18 8H16V6C16 3.79 14.21 2 12 2ZM10 6C10 4.9 10.9 4 12 4C13.1 4 14 4.9 14 6V8H10V6ZM6 10H18V20H6V10Z"
                              fill="currentColor"
                            />
                          </svg>
                        </div>
                      </div>
                      <h1 className="albumItemText">אלבום 3</h1>
                    </div>
                  ) : (
                    <div
                      className="albumMove"
                      onClick={() => setChosenAlbum(3)}
                    >
                      <img
                        src={filteredLessons[0].preview}
                        alt=""
                        className="albumItemImg"
                      />
                      <h1 className="albumItemText">אלבום 3</h1>
                    </div>
                  )}
                  <div className="albumMove" onClick={() => setChosenAlbum(2)}>
                    <img
                      src={filteredLessons[0].preview}
                      alt=""
                      className="albumItemImg"
                    />
                    <h1 className="albumItemText">אלבום 2</h1>
                  </div>
                  <div className="albumMove" onClick={() => setChosenAlbum(1)}>
                    <img
                      src={filteredLessons[0].preview}
                      alt=""
                      className="albumItemImg"
                    />
                    <h1 className="albumItemText">אלבום 1</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Bonus Content Modal */ }
      <Modal showModal={showModal} toggleShowModal={toggleShowModal} >
        <h1 style={{ textAlign: "center" }}>תוכן בונוס </h1>
        <p dir="auto" style={{ maxWidth: 400, textAlign: "justify" }}>
          איך להתכתב עם נשים עד הפגישה , איך לבנות את הפרופיל המושלם ,
          הורדה של כל קבצי הסטורים , ובונוסים של הרצאות והדרכות שלי על
          מה לעשות בדייט
          <p style={{ color: "red", fontWeight: "bold" }}>
            שים לב בתשלום להשתמש באותו אמייל שרכשת את הקורס
          </p>
        </p>
        <button
          type="button"
          onClick={() => {
            window.location.href =
              import.meta.env.VITE_BONUS_CONTENT_PAY_URL;
          }}
        >
          קנה את זה עכשיו!
        </button>
      </Modal> 
    </>
  );
};

export default Lessons;
