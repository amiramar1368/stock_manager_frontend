import spinner from "../assets/images/spinner.gif";

function Spinner() {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "80%", position: "absolute",top:'20px',left:'50%' }}>
      <img src={spinner}></img>
    </div>
  );
}

export default Spinner;
