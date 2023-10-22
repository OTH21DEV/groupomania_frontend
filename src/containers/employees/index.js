import React, { useEffect, useRef, useState } from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import Employee from "../../components/employee";
import Heading from "../../components/heading";
import woman from "../../assets/woman.png";
import phone from "../../assets/phone.png";
import man from "../../assets/man.png";
import boy from "../../assets/boy.png";
import girl from "../../assets/girl.png";

const Employees = () => {
  const scrollContainerRef = useRef(null);
  const leftArrowRef = useRef(null);
  const rightArrowRef = useRef(null);
  const employeeRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    const leftArrow = leftArrowRef.current;
    const rightArrow = rightArrowRef.current;

    const handleLeftArrowClick = () => {
      scrollContainer.scrollBy({
        top: 0,
        left: -200,
        behavior: "smooth",
      });
    };

    const handleRightArrowClick = () => {
      scrollContainer.scrollBy({
        top: 0,
        left: 200,
        behavior: "smooth",
      });
    };

    leftArrow.addEventListener("click", handleLeftArrowClick);
    rightArrow.addEventListener("click", handleRightArrowClick);

    return () => {
      leftArrow.removeEventListener("click", handleLeftArrowClick);
      rightArrow.removeEventListener("click", handleRightArrowClick);
    };
  }, []);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    const leftArrow = leftArrowRef.current;
    const rightArrow = rightArrowRef.current;
    const employees = Array.from(scrollContainer.children);

    const handleLeftArrowClick = () => {
      const visibleEmployees = employees.filter((employee) => employee.classList.contains("show"));
console.log(visibleEmployees)
      if (visibleEmployees.length > 0) {
        const firstVisibleEmployeeIndex = employees.indexOf(visibleEmployees[0]);
        const previousEmployeeIndex = (firstVisibleEmployeeIndex - 1 + employees.length) % employees.length;

        visibleEmployees.forEach((employee) => {
          employee.classList.remove("show");
        });

        employees[previousEmployeeIndex].classList.add("show");
      }
    };

    const handleRightArrowClick = () => {
      const visibleEmployees = employees.filter((employee) => employee.classList.contains("show"));

      if (visibleEmployees.length > 0) {
        const lastVisibleEmployeeIndex = employees.indexOf(visibleEmployees[visibleEmployees.length - 1]);
        const nextEmployeeIndex = (lastVisibleEmployeeIndex + 1) % employees.length;

        visibleEmployees.forEach((employee) => {
          employee.classList.remove("show");
        });

        employees[nextEmployeeIndex].classList.add("show");
      }
    };

    leftArrow.addEventListener("click", handleLeftArrowClick);
    rightArrow.addEventListener("click", handleRightArrowClick);

    return () => {
      leftArrow.removeEventListener("click", handleLeftArrowClick);
      rightArrow.removeEventListener("click", handleRightArrowClick);
    };
  }, []);

  const cn = bem("Employees");
  return (
    <>
      <div className={cn()}>
        <Heading title={"New employees"} />
        <div className={cn("test")} ref={scrollContainerRef}>
          <Employee className="fadeIn" ref={employeeRef} photo={man} title={`Nico\nReis`} role="IT Engeener" icon={phone} phone={"3589"} />
          <Employee className="fadeIn" ref={employeeRef} photo={woman} title={`Melanie\nSantos`} role="Designer" icon={phone} phone={"3599"} />
          <Employee className="fadeIn" ref={employeeRef} photo={boy} title={`Adam\nColin`} role="Developer" icon={phone} phone={"3586"} />
          <Employee className="fadeIn" ref={employeeRef} photo={girl} title={`Eva\nColins`} role="Accountant" icon={phone} phone={"3584"} />
        </div>

        <div className={cn("arrow")}>
          <div className="arrow left-arrow" ref={leftArrowRef}>
            &#8249;
          </div>

          <div className="arrow right-arrow" ref={rightArrowRef}>
            &#8250;
          </div>
        </div>
      </div>
    </>
  );
};

export default Employees;
