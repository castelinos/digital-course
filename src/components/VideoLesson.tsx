import React from "react";
import "../App.css"
import "../assets/css/lessons.css";

interface NavBarProps {
    src: string;
    text: string;
    setDiaglogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setContent: React.Dispatch<React.SetStateAction<string[]>>;
}

function VideoLesson({ src, text, setDiaglogOpen, setContent}: NavBarProps) {

    return (
        <div className="videoConatiner imgaeSliderVideo">
            <div className="playContainer">
                <img src={src} alt="video" />
                <div className="buttonWrapper">
                    <button className="playButton" onClick={() => {setDiaglogOpen(true); setContent([text]);}}>&#10095;</button>
                </div>
                <h1 className="imageTitle">{text}</h1>
            </div>
        </div>
    );
}

export default VideoLesson;

/*

            {
                isDialogOpen && (
                    <div className="dialogBackdrop">
                        <div className="dialog">
                            <h2>Video Title or Any Content</h2>
                            <p>This is where your video details or any content can go.</p>
                            <button onClick={() => setDiaglogOpen(false)}>Close</button>
                        </div>
                    </div>
                )
            }

            */
