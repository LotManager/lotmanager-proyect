import FirstContainer from "./FirstContainer";
import SecondContainer from "./SecondContainer";

export default function SecondViewHome() {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1">
        <FirstContainer />
      </div>
      <div className="flex-1">
        <SecondContainer />
      </div>
    </div>
  );
}
