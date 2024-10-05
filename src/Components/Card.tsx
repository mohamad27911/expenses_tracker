import { useState } from "react";
import ProgressBar from "./ProgressBar";

function Card() {
  const [isProg, setIsProg] = useState(false);

  return (
    <div className="bg-secondary text-white border border-text-light px-10 font-bold rounded-3xl">
      <h1 className="py-4 text-2xl">Total Income</h1>
      <div className={`grid gap-10 ${isProg ? "mb-0" : "mb-8"}`}>
        <div className={`mt-5 text-4xl `}>
          $0.00
        </div>
        {!isProg && <ProgressBar />}
      </div>
    </div>
  );
}

export default Card;
