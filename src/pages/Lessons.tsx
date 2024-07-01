import React, { useState, useMemo } from "react";
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

const purchase = { addon: false };

interface Lesson {
  id: number;
  album: number;
  title: string;
  url: string;
  isCurrentlyPlaying: boolean;
  preview: string;
  text: string;
}

const lessonsList: Lesson[] = [
  // First Album
  {
    id: 1,
    album: 1,
    title: "שיעור 1",
    url: "/Videos/Album1/IMG_2789.mp4",
    isCurrentlyPlaying: true,
    preview: "/Videos/Album1/2789.jpg",
    text: "הקדמה",
  },
  {
    id: 2,
    album: 1,
    title: "שיעור 2",
    url: "/Videos/Album1/IMG_2790.mp4",
    isCurrentlyPlaying: false,
    preview: "/Videos/Album1/2790.jpg",
    text: "הפרופיל המושלם",
  },
  {
    id: 3,
    album: 1,
    title: "שיעור 3",
    url: "/Videos/Album1/IMG_2791.mp4",
    isCurrentlyPlaying: false,
    preview: "/Videos/Album1/2791.jpg",
    text: "בניית ביו",
  },
  {
    id: 4,
    album: 1,
    title: "שיעור 4",
    url: "/Videos/Album1/IMG_2792.mp4",
    isCurrentlyPlaying: false,
    preview: "/Videos/Album1/2792.jpg",
    text: "חמשת המודלים",
  },
  {
    id: 5,
    album: 1,
    title: "שיעור 5",
    url: "/Videos/Album1/IMG_2793.mp4",
    isCurrentlyPlaying: false,
    preview: "/Videos/Album1/2793.jpg",
    text: "המודל הראשון",
  },
  {
    id: 6,
    album: 1,
    title: "שיעור 6",
    url: "/Videos/Album1/IMG_2794.mp4",
    isCurrentlyPlaying: false,
    preview: "/Videos/Album1/2794.jpg",
    text: "המודל השני",
  },
  {
    id: 7,
    album: 1,
    title: "שיעור 7",
    url: "/Videos/Album1/IMG_2795.mp4",
    isCurrentlyPlaying: false,
    preview: "/Videos/Album1/2795.jpg",
    text: "המודל השלישי",
  },
  {
    id: 8,
    album: 1,
    title: "שיעור 8",
    url: "/Videos/Album1/IMG_2796.mp4",
    isCurrentlyPlaying: false,
    preview: "/Videos/Album1/2796.jpg",
    text: "המודל הרביעי",
  },
  {
    id: 9,
    album: 1,
    title: "שיעור 9",
    url: "/Videos/Album1/IMG_2797.mp4",
    isCurrentlyPlaying: false,
    preview: "/Videos/Album1/2797.jpg",
    text: "המודל החמישי",
  },
  //Second Album
  {
    id: 10,
    album: 2,
    title: "שיעור 1",
    url: "/Videos/Album2/IMG_2853.mp4",
    isCurrentlyPlaying: false,
    preview: "/Videos/Album2/2853.jpg",
    text: "איך למגנט נשים",
  },
  {
    id: 11,
    album: 2,
    title: "שיעור 2",
    url: "/Videos/Album2/IMG_2854.mp4",
    isCurrentlyPlaying: false,
    preview: "/Videos/Album2/2854.jpg",
    text: "עוקבים",
  },
  {
    id: 12,
    album: 2,
    title: "שיעור 3",
    url: "/Videos/Album2/IMG_2856.mp4",
    isCurrentlyPlaying: false,
    preview: "/Videos/Album2/2856.jpg",
    text: "סטורים מעניינים",
  },
  {
    id: 13,
    album: 2,
    title: "שיעור 4",
    url: "/Videos/Album2/IMG_2857.mp4",
    isCurrentlyPlaying: false,
    preview: "/Videos/Album2/2857.jpg",
    text: "מה כדאי לי לפרסם",
  },
  {
    id: 14,
    album: 2,
    title: "שיעור 5",
    url: "/Videos/Album2/IMG_2858.mp4",
    isCurrentlyPlaying: false,
    preview: "/Videos/Album2/2858.jpg",
    text: "אחרי מי לעקוב",
  },
  {
    id: 15,
    album: 2,
    title: "שיעור 6",
    url: "/Videos/Album2/IMG_2860.mp4",
    isCurrentlyPlaying: false,
    preview: "/Videos/Album2/2860.jpg",
    text: "הייט לייטים",
  },
  {
    id: 16,
    album: 2,
    title: "שיעור 7",
    url: "/Videos/Album2/IMG_2861.mp4",
    isCurrentlyPlaying: false,
    preview: "/Videos/Album2/2861.jpg",
    text: "כל הסודות",
  },
  {
    id: 17,
    album: 2,
    title: "שיעור 8",
    url: "/Videos/Album2/IMG_2862.mp4",
    isCurrentlyPlaying: false,
    preview: "/Videos/Album2/2862.jpg",
    text: "1 - למה אינסטגרם",
  },
  {
    id: 18,
    album: 2,
    title: "שיעור 9",
    url: "/Videos/Album2/IMG_2863.mp4",
    isCurrentlyPlaying: false,
    preview: "/Videos/Album2/2863.jpg",
    text: "2 - למה אינסטגרם",
  },
  {
    id: 19,
    album: 2,
    title: "שיעור 10",
    url: "/Videos/Album2/IMG_2875.mp4",
    isCurrentlyPlaying: false,
    preview: "/Videos/Album2/2875.jpg",
    text: "בונוס - טירגוטים וקידום ממומן",
  },
  // Album 3
  {
    id: 20,
    album: 3,
    title: "שיעור 1",
    url: "/Videos/Album3/IMG_2901.mp4",
    isCurrentlyPlaying: false,
    preview: "/Videos/Album3/2901.png",
    text: "מהודעה לפגישה חלק",
  },
  {
    id: 21,
    album: 3,
    title: "שיעור 2",
    url: "/Videos/Album3/IMG_2902.mp4",
    isCurrentlyPlaying: false,
    preview: "/Videos/Album3/2902.png",
    text: "תבנית הודעה חלק",
  },
  {
    id: 22,
    album: 3,
    title: "שיעור 3",
    url: "/Videos/Album3/IMG_2903.mp4",
    isCurrentlyPlaying: false,
    preview: "/Videos/Album3/2903.png",
    text: "תבנית הודעה חלק",
  },
  {
    id: 23,
    album: 3,
    title: "שיעור 4",
    url: "/Videos/Album3/IMG_2904.mp4",
    isCurrentlyPlaying: false,
    preview: "/Videos/Album3/2904.png",
    text: "תבנית הודעה חלק",
  },
  {
    id: 24,
    album: 3,
    title: "שיעור 5",
    url: "/Videos/Album3/IMG_2905.mp4",
    isCurrentlyPlaying: false,
    preview: "/Videos/Album3/2905.png",
    text: "דוגמא מהפרופיל המושלם חלק",
  },
  {
    id: 25,
    album: 3,
    title: "שיעור 6",
    url: "/Videos/Album3/IMG_2906.mp4",
    isCurrentlyPlaying: false,
    preview: "/Videos/Album3/2906.png",
    text: "דוגמא מהודעות עם נשים חלק",
  },
  {
    id: 26,
    album: 3,
    title: "שיעור 7",
    url: "/Videos/Album3/IMG_2907.mp4",
    isCurrentlyPlaying: false,
    preview: "/Videos/Album3/2907.png",
    text: "הסבר סיום קורס חלק",
  },
  {
    id: 27,
    album: 3,
    title: "שיעור 8",
    url: "/Videos/Album3/IMG_2908.mp4",
    isCurrentlyPlaying: false,
    preview: "/Videos/Album3/2908.png",
    text: "איך לחיות כמו דן בלזיריאן בונוס",
  },
  {
    id: 28,
    album: 3,
    title: "שיעור 9",
    url: "/Videos/Album3/IMG_2909.mp4",
    isCurrentlyPlaying: false,
    preview: "/Videos/Album3/2909.png",
    text: "לצאת לבד בונוס",
  },
  {
    id: 29,
    album: 3,
    title: "שיעור 10",
    url: "/Videos/Album3/IMG_2910.mp4",
    isCurrentlyPlaying: false,
    preview: "/Videos/Album3/2910.png",
    text: "פסיכולוגיה נשית בונוס",
  },
];

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

const Lessons: React.FC = () => {
  useRequireAuth();
  const navigate = useNavigate();
  const [chosenAlbum, setChosenAlbum] = useState<number>(1);
  const [chosenLesson, setChosenLesson] = useState<string>(lessonsList[0].url);
  const [lessons, setLessons] = useState<Lesson[]>(lessonsList);
  const { isDesktopOrLaptop, isTabletOrMobile } = useResponsive();
  // const [isMentorMenuOpen, setIsMentorMenuOpen] = useState<boolean>(false);

  const handleLessonClick = (url: string, id: number) => {
    setChosenLesson(url);
    const updatedLessons = lessons.map((lesson) => ({
      ...lesson,
      isCurrentlyPlaying: lesson.id === id,
    }));
    setLessons(updatedLessons);
  };

  const filteredLessonsByAlbum = useMemo(
    () => lessons.filter((lesson) => lesson.album === chosenAlbum),
    [lessons, chosenAlbum]
  );

  const renderedLessons = useMemo(
    () =>
      lessons.map((lesson) => {
        if (lesson.album === chosenAlbum)
          return (
            <div
              key={lesson.id}
              className="lessonItem"
              onClick={() => handleLessonClick(lesson.url, lesson.id)}
            >
              <img src={lesson.preview} alt="" className="lessonItemImg" />
              {lesson.isCurrentlyPlaying ? (
                <h1 className="lessonItemPlaying">מתנגן עכשיו</h1>
              ) : (
                <h1 className="lessonItemIsntPlaying">{lesson.text}</h1>
              )}
              <h1 className="lessonItemText">{lesson.title}</h1>
            </div>
          );
      }),
    [lessons, chosenAlbum]
  );

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
                {/* // <div className="meetingContainerNotOpened">
                            //     <div className="meetingContainerContent" onClick={() => {setIsMentorMenuOpen(true)}}>
                            //         <img src={MentorProfile} alt="" className="meetingImg" />
                            //         <div className="notificationDot"></div>
                            //     </div>
                            // </div> */}

                <div className="videoConatiner">
                  <VideoPlayer url={chosenLesson} />
                </div>
                <div className="coursesList">
                  <h1 className="coursesListHeader">אלבום {chosenAlbum}</h1>
                  <h1 className="coursesListSubHeader">
                    שיעורים: {filteredLessonsByAlbum.length}
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
                  { !purchase.addon ? (
                    <div
                      className="albumMove"
                      onClick={() => {
                        navigate("/bonus-content");
                      }}
                    >
                      <div className="lockedAlbum">
                        <img
                          src={lessonsList[0].preview}
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
                        src={lessonsList[3].preview}
                        alt=""
                        className="albumItemImg"
                      />
                      <h1 className="albumItemText">אלבום 3</h1>
                    </div>
                  )}

                  <div className="albumMove" onClick={() => setChosenAlbum(2)}>
                    <img
                      src={lessonsList[1].preview}
                      alt=""
                      className="albumItemImg"
                    />
                    <h1 className="albumItemText">אלבום 2</h1>
                  </div>
                  <div className="albumMove" onClick={() => setChosenAlbum(1)}>
                    <img
                      src={lessonsList[2].preview}
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
                {/* {isMentorMenuOpen ? */}
                {/* <div className="meetingContainer">
                                <img src={MentorProfile} alt="" className="meetingImg" />
                                <h1 className="meetingHeader">היי, כאן המנטור שלך</h1>
                                <h1 className="meetingSubHeader">מוכן להתחיל?</h1>
                                <h1 className="meetingText">מגיעה לך פגישת ייעוץ של כחצי שעה עם אחד מאנשי הצוות, לחץ כאץ כדי לקבוע אותה</h1>
                                <Button variant="contained" color="warning" onClick={scheduleMetting}>!קבע פגישה</Button>
                            </div>  */}
                {/* // <div className="meetingContainerNotOpened">
                            //     <div className="meetingContainerContent" onClick={() => {setIsMentorMenuOpen(true)}}>
                            //         <img src={MentorProfile} alt="" className="meetingImg" />
                            //         <div className="notificationDot"></div>
                            //     </div>
                            // </div> */}

                <div className="videoConatinerMobile">
                  <VideoPlayer url={chosenLesson} />
                </div>
                <div className="coursesListMobile">
                  <h1 className="coursesListHeader">אלבום {chosenAlbum}</h1>
                  <h1 className="coursesListSubHeader">
                    שיעורים: {filteredLessonsByAlbum.length}
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
                  { !purchase.addon ? (
                    <div
                      className="albumMove"
                      onClick={() => {
                        navigate("/bonus-content");
                      }}
                    >
                      <div className="lockedAlbum">
                        <img
                          src={lessonsList[0].preview}
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
                        src={lessonsList[3].preview}
                        alt=""
                        className="albumItemImg"
                      />
                      <h1 className="albumItemText">אלבום 3</h1>
                    </div>
                  )}
                  <div className="albumMove" onClick={() => setChosenAlbum(2)}>
                    <img
                      src={lessonsList[1].preview}
                      alt=""
                      className="albumItemImg"
                    />
                    <h1 className="albumItemText">אלבום 2</h1>
                  </div>
                  <div className="albumMove" onClick={() => setChosenAlbum(1)}>
                    <img
                      src={lessonsList[2].preview}
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
    </>
  );
};

export default Lessons;
