import React, { useEffect, useRef } from "react";
import { cn as bem } from "@bem-react/classname";
import Employee from "../../components/employee";
import Heading from "../../components/heading";
import phone from "../../assets/phone.png";
import dev_img_v2 from "../../assets/dev_img_v2.jpg";
import des_img from "../../assets/des_img.jpg";
import dev_img from "../../assets/dev_img.jpg";
import "./style.css";

const Employees = () => {
  const cn = bem("Employees");
  const scrollContainerRef = useRef(null);
  const leftArrowRef = useRef(null);
  const rightArrowRef = useRef(null);

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

  return (
    <>
      <div className={cn()}>
        <Heading title={"New employees"} />
        <div className={cn("wrapper")} ref={scrollContainerRef}>
          <Employee photo={dev_img_v2} title={`Adam\nColin`} role="Developer" icon={phone} phone={"3599"} />
          <Employee photo={des_img} title={`Melanie\nSantos`} role="Designer" icon={phone} phone={"3569"} />
          <Employee photo={dev_img} title={`Nico\nReis`} role="Designer" icon={phone} phone={"3589"} />
        </div>

        <div className={cn("arrow")}>
          <div className={cn("left-arrow")} ref={leftArrowRef}>
            &#8249;
          </div>

          <div className={cn("right-arrow")} ref={rightArrowRef}>
            &#8250;
          </div>
        </div>
      </div>
    </>
  );
};

export default Employees;
