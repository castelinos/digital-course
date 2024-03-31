import React, { useState } from "react";
import NavBar from "@/components/navbar";
import Logo from "../assets/animated.png";
import Video1 from "../assets/banner3.png";
import Video2 from "../assets/banner2.png";
import 'bootstrap/dist/css/bootstrap.css'
import '../assets/css/lessons.css'
import VideoLesson from "@/components/VideoLesson";

const Lessons: React.FC = () => {
    let items = ["עמוד הבית", "שיעורים", "קצת עלינו"];
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [content, setContent] = useState<string[]>([""]);

    const handleSliderClick = (e: any) => {
        let handle;
        if (e.target.matches(".handle")) handle = e.target;
        else {
            handle = e.target.closest(".handle")
        }

        if (handle != null) {
            const progressBar = handle.closest(".row").querySelector(".progress-bar")
            const slider = handle.closest(".container").querySelector(".slider")
            const sliderIndex = parseInt(getComputedStyle(slider).getPropertyValue("--slider-index"));
            const progressBarItemCount = progressBar.children.length;
            if (handle.classList.contains("left-handle")) {
                if (sliderIndex - 1 < 0) {
                    slider.style.setProperty("--slider-index", progressBarItemCount - 1);
                    progressBar.children[sliderIndex].classList.remove("active");
                    progressBar.children[progressBarItemCount - 1].classList.add("active");
                } else {
                    slider.style.setProperty("--slider-index", sliderIndex - 1);
                    progressBar.children[sliderIndex].classList.remove("active");
                    progressBar.children[sliderIndex - 1].classList.add("active");
                }
            }
            if (handle.classList.contains("right-handle")) {
                if (sliderIndex + 1 >= progressBarItemCount) {
                    slider.style.setProperty("--slider-index", 0);
                    progressBar.children[sliderIndex].classList.remove("active");
                    progressBar.children[0].classList.add("active");
                } else {
                    slider.style.setProperty("--slider-index", sliderIndex + 1);
                    progressBar.children[sliderIndex].classList.remove("active");
                    progressBar.children[sliderIndex + 1].classList.add("active");
                }
            }
        }
    }

    const calculateProgressBar = (progressBar: any) => {
        progressBar.innerHTML = "";
        const slider = progressBar.closest(".row").querySelector(".slider")
        const itemCount = slider.children.length;
        const itemsPerScreen = parseInt(getComputedStyle(slider).getPropertyValue("--items-per-screen"));
        let sliderIndex = parseInt(getComputedStyle(slider).getPropertyValue("--slider-index"));
        const progressBarItemCount = Math.ceil(itemCount / itemsPerScreen);
        if (sliderIndex >= progressBarItemCount) {
            slider.style.setProperty("--slider-index", progressBarItemCount - 1);
            sliderIndex = progressBarItemCount - 1;
        }
        for (let i = 0; i < progressBarItemCount; i++) {
            const barItem = document.createElement("div");
            barItem.classList.add("progress-item");
            if (i == sliderIndex) {
                barItem.classList.add("active")
            }
            progressBar.append(barItem)
        }
    }

    const throttle = (cb: any, delay: number = 1000) => {
        let shouldWait = false
        let waitingArgs: any
        const timeoutFunc = () => {
            if (waitingArgs == null) {
                shouldWait = false
            } else {
                cb(...waitingArgs)
                waitingArgs = null
                setTimeout(timeoutFunc, delay)
            }
        }

        return (...args: any) => {
            if (shouldWait) {
                waitingArgs = args
                return
            }

            cb(...args)
            shouldWait = true
            setTimeout(timeoutFunc, delay)
        }
    }



    const throttleProgressBar = throttle(() => {
        document.querySelectorAll(".progress-bar").forEach(calculateProgressBar);
    }, 250)
    window.addEventListener("resize", throttleProgressBar)

    document.querySelectorAll(".progress-bar").forEach(calculateProgressBar);



    return (
        <>
            <NavBar brandName="Female-Dynamics" imageSrcPath={Logo} navItems={items} />
            {
                isDialogOpen && (
                    <div className="dialogBackdrop">
                        <div className="dialog">
                            <h2>{content[0]}</h2>
                            <p>מידע על השיעור ומה לומדים בו</p>
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/ItqsnD46gDQ?si=PWN0_KlJHzwBce7V" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" className="imgaeSlider"></iframe>
                            <br />
                            <br />
                            <br />
                            <br />
                            <button onClick={() => setIsDialogOpen(false)}>סגור שיעור</button>
                        </div>
                    </div>
                )
            }
            <div className="containerFlex">
                <div className="topHeader">
                    <h1 className="topHeaderText">הצלחה עם נשים ברשתות חברתיות - באינסטגרם וטינדר</h1>
                </div>
            </div>
            <div className="row">
                <div className="header">
                    <div className="progress-bar">
                        <div className="progress-item active"></div>
                        <div className="progress-item"></div>
                        <div className="progress-item"></div>
                        <div className="progress-item"></div>
                    </div>
                    <h3 className="title">השיעורים שלנו</h3>
                </div>
                <div className="container">
                    <button className="handle left-handle" onClick={(e: any) => { handleSliderClick(e) }}>
                        <div className="text">
                            &#8249;
                        </div></button>
                    <div className="slider">
                        <VideoLesson src={Video1} text="#1 - מי אנחנו" setDiaglogOpen={setIsDialogOpen} setContent={setContent} />
                        <VideoLesson src={Video2} text="הצלחה עם נשים - #2" setDiaglogOpen={setIsDialogOpen} setContent={setContent}/>
                        <VideoLesson src={Video1} text="#3 - להכיר את הבוס" setDiaglogOpen={setIsDialogOpen} setContent={setContent}/>
                        <VideoLesson src={Video2} text="איך לגשת - #4" setDiaglogOpen={setIsDialogOpen} setContent={setContent}/>
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/ItqsnD46gDQ?si=PWN0_KlJHzwBce7V" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" className="imgaeSlider"></iframe>
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/0NlXRZFXg84?si=nU1QRXUQLHZvUqwJ" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" className="imgaeSlider"></iframe>
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/ItqsnD46gDQ?si=PWN0_KlJHzwBce7V" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" className="imgaeSlider"></iframe>
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/0NlXRZFXg84?si=nU1QRXUQLHZvUqwJ" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" className="imgaeSlider"></iframe>
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/ItqsnD46gDQ?si=PWN0_KlJHzwBce7V" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" className="imgaeSlider"></iframe>
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/0NlXRZFXg84?si=nU1QRXUQLHZvUqwJ" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" className="imgaeSlider"></iframe>
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/ItqsnD46gDQ?si=PWN0_KlJHzwBce7V" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" className="imgaeSlider"></iframe>
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/0NlXRZFXg84?si=nU1QRXUQLHZvUqwJ" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" className="imgaeSlider"></iframe>
                    </div>
                    <button className="handle right-handle" onClick={(e: any) => { handleSliderClick(e) }}>
                        <div className="text">
                            &#8250;
                        </div></button>
                </div>
            </div>
        </>
    )
}

export default Lessons;