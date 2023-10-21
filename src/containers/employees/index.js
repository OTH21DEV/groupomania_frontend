import React from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import Employee from "../../components/employee";
import Heading from "../../components/heading";
import woman from "../../assets/woman.png";
import phone from "../../assets/phone.png";

const Employees = () => {
  const cn = bem("Employees");
  return (
    <div className={cn()}>
      <Heading title={"New employees"} />
      <Employee photo={woman} title={`Melanie\nSantos`} role="Designer" icon={phone} phone={"3599"} />
    </div>
  );
};

export default Employees;
