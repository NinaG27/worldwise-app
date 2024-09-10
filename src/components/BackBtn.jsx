import { useNavigate } from "react-router-dom";
import Button from "./Button";

function BackBtn({ callback } = {}) {
  const navigate = useNavigate();
  //TODO - fix the move one up issue -
  return (
    <div>
      <Button
        type="back"
        onClick={(e) => {
          e.preventDefault();
          if (callback) {
            callback();
          }
          navigate(-1);
        }}
      >
          &larr; Back
      </Button>
    </div>
  );
}

export default BackBtn;
