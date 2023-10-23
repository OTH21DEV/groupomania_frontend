import React from "react";
import { useNavigate } from "react-router-dom";
import Link from "../../components/link";
import employee from "../../assets/employee.png";
import idea from "../../assets/idea.png";
import laptop from "../../assets/laptop.png";
import certificate from "../../assets/certificate.png";
import news from "../../assets/new.png";
import draft from "../../assets/draft.png";
import print from "../../assets/print.png";
import meeting from "../../assets/meeting.png";
import help from "../../assets/help.png";
import Heading from "../../components/heading";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

const Links = () => {
  const cn = bem("Links");
  let navigate = useNavigate();

  function handleClick(e){
console.log(e)
    navigate("/new-post")
  }
  

  return (
    <div className={cn()}>
      <Heading title ={"Quick links"}/>
 <Link name={"Propose post"} style={"#E672FC"} icon={news} url={"/new-post"}/>
      <Link name={"Find employee"} icon={employee} style={"#FC72A5 "} />
      <Link name={"Submit proposition "} style={"#7AC583"} icon={idea} />
      <Link name={"Contact IT department "} style={"#A88C94"} icon={laptop} />
      <Link name={"Receive certificate"} style={"#4AA488"} icon={certificate} />
      <Link name={"Request draft"} style={"#745BA8"} icon={draft} />
      <Link name={"Print business cart"} style={"#E4D019"} icon={print} />
      <Link name={"Book meeting room"} style={"#4672FA"} icon={meeting} />
      <Link name={"Ask help"} style={"#FA2C2C"} icon={help} />
    </div>
  );
};

export default Links;
