
import ProgressBar from "./ProgressBar";
interface PropsType{
isProg:boolean
title:string
}
function Card(props:PropsType) {

  return (
    <div className="bg-secondary text-white border border-text-light px-10 font-bold rounded-3xl">
      <h1 className="py-4 text-2xl">{props.title}</h1>
      <div className={`grid gap-10 ${props.isProg ? "mb-0" : "mb-8"}`}>
        <div className={`mt-5 text-4xl `}>
          $0.00
        </div>
        {props.isProg && <ProgressBar />}
      </div>
    </div>
  );
}

export default Card;
