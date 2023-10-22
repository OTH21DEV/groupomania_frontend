import React from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import Employee from "../../components/employee";
import Heading from "../../components/heading";
import woman from "../../assets/woman.png";
import phone from "../../assets/phone.png";
import man from "../../assets/man.png"
import boy from "../../assets/boy.png"
const Employees = () => {
  const cn = bem("Employees");
  return (
    <div className={cn()}>
      <Heading title={"New employees"} />
      <Employee photo={woman} title={`Melanie\nSantos`} role="Designer" icon={phone} phone={"3599"} />
      <Employee photo={man} title={`Nico\nReis`} role="IT Engeener" icon={phone} phone={"3589"} />
      {/* <Employee photo={boy} title={`Adam\nColin`} role="Developer" icon={phone} phone={"3586"} /> */}
    </div>
  );
};

export default Employees;
