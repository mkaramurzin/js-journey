import { useState } from "react";
import Alert from "./components/Alert";
import Button from "./components/Button";

function App() {
  const [showAlert, setShowAlert] = useState(false);
  const onButtonClick = () => {
    setShowAlert(true);
    // setTimeout(() => {
    //   setShowAlert(false);
    // }, 3000); // Set the timeout interval to 3000 milliseconds (3 seconds)
  };

  const onDismissClicked = () => {
    setShowAlert(false);
  };

  return (
    <div>
      {showAlert && (
        <Alert onDismissClicked={onDismissClicked}>Button Clicked!</Alert>
      )}
      <Button color="info" onButtonClick={onButtonClick}>
        Click me
      </Button>
    </div>
  );
}

export default App;
