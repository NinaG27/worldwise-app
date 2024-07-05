import { useNavigate } from "react-router-dom";
import Button from "./Button";

function BackBtn() {
    const navigate = useNavigate();
//TODO - namesti da ne radi uvek -1 nazad nego samo na /cities ili /countries 
    return (
        <div>
            <Button
                type='back'
                onClick={e => {
                    e.preventDefault();
                    navigate(-1);
                }}
            >
                &larr; Back
            </Button>
        </div>
    );
}

export default BackBtn;
