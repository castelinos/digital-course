import React from "react";
// import { Button } from "@/components/ui/button";
import NavBar from "@/components/navbar";
import Logo from "../assets/animated.png";
import 'bootstrap/dist/css/bootstrap.css';
import "../assets/css/home.css";
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { useResponsive } from "@/context/PlatformContext";



const Home: React.FC = () => {
    let items = ["עמוד הבית", "שיעורים", "קצת עלינו"];
    const navigate = useNavigate();
    useRequireAuth();
    const { isDesktopOrLaptop, isTabletOrMobile } = useResponsive();


    const handleBtnClick = (pageIndex: number) => {
        switch (pageIndex) {
            case 0:
                navigate("/aboutus");
                break;
            case 1:
                navigate("/lessons");
                break;
        };
    };

    return (
        <>
            {isDesktopOrLaptop &&
                <>
                    <NavBar brandName="Female-Dynamics" imageSrcPath={Logo} navItems={items} />
                    <div className="backgroundContainer">
                        <div className="containerFlex">
                            <div className="topHeader">
                                <div className="headerText">
                                    הכירו את הקורס להצלחה עם נשים <span className="headerTextColored">בטינדר ובאינסטגרם</span>
                                </div>
                                <div className="subHeaderText">
                                    המוצר הטוב ביותר לשליטה במשחק הפנימי שלך, היישום שלו בפועל וההעצמה שלו שישמשו אותך לכל החיים
                                </div>
                                <div className="headerButtons">
                                    <Button variant="ghost" style={{ backgroundColor: '#33363A' }} onClick={() => { handleBtnClick(0) }}>קצת עלינו</Button>
                                    <Button variant="ghost" style={{ backgroundColor: '#AA8736' }} onClick={() => { handleBtnClick(1) }}>מעבר לשיעורים</Button>
                                </div>
                            </div>
                        </div>
                        <div className="videoConatinerHome">
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/ItqsnD46gDQ?si=PWN0_KlJHzwBce7V" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" className="imgaeSlider"></iframe>
                        </div>
                        <div className="lowerHeader">
                            <div className="lowerHeaderText">
                                .הצלחה עם נשים ברשתות החברתיות זה הגדרה של המשחק הפנימי שלך
                            </div>
                            <div className="lowerHeaderText">
                                ?איך המשחק הפנימי נראה
                            </div>
                            <div className="lowerHeaderTextColored">
                                זאת שאלה שבחיים לא תצטרך לשאול את עצמך יותר
                            </div>
                        </div>
                    </div></>}


            {isTabletOrMobile && <>
                <div className="backgroundContainer">
                        <div className="containerFlex">
                            <div className="topHeaderMobile">
                                <div className="headerText headerTextMobile">
                                    הכירו את הקורס להצלחה עם נשים <span className="headerTextColored">בטינדר ובאינסטגרם</span>
                                </div>
                                <div className="subHeaderText headerTextMobile">
                                    המוצר הטוב ביותר לשליטה במשחק הפנימי שלך, היישום שלו בפועל וההעצמה שלו שישמשו אותך לכל החיים
                                </div>
                                <div className="headerButtons">
                                    <Button variant="ghost" style={{ backgroundColor: '#33363A', color: 'white' }} onClick={() => { handleBtnClick(0) }}>קצת עלינו</Button>
                                    <Button variant="ghost" style={{ backgroundColor: '#AA8736', color: 'white' }} onClick={() => { handleBtnClick(1) }}>מעבר לשיעורים</Button>
                                </div>
                            </div>
                        </div>
                        <div className="videoConatinerHome">
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/ItqsnD46gDQ?si=PWN0_KlJHzwBce7V" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" className="imgaeSliderMobile"></iframe>
                        </div>
                        <div className="lowerHeader">
                            <div className="lowerHeaderText lowerTextMobile">
                                .הצלחה עם נשים ברשתות החברתיות זה הגדרה של המשחק הפנימי שלך
                            </div>
                            <div className="lowerHeaderText lowerTextMobile">
                                ?איך המשחק הפנימי נראה
                            </div>
                            <div className="lowerHeaderTextColored lowerTextMobile" style={{ paddingBottom: '1rem'}}>
                                זאת שאלה שבחיים לא תצטרך לשאול את עצמך יותר
                            </div>
                        </div>
                    </div>
            </>}
        </>
    )
}

export default Home;