import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import '../assets/css/lessons.css';
import { useRequireAuth } from "@/hooks/useRequireAuth";


const BonusContent: React.FC = () => {
    useRequireAuth();


    return (
        <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div>
                <div>
                    <div>
                        <div className="card">
                            <div className="card-body" style={{ display: 'flex', flexDirection: 'column', alignContent: 'center', justifyContent: 'center'}}>
                                <h1 style={{ textAlign: 'center'}}>תוכן בונוס</h1>
                                <p>
                                    תוכן זה אינו חלק מהקורס, על מנת להמשיך לצפות
                                </p>
                                <button>לחץ כאן</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BonusContent;




