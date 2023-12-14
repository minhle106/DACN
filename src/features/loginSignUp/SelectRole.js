import Student from "../../assets/images/Student.png";
import Emloyee from "../../assets/images/Employee.png";
import Company from "../../assets/images/Company.png";
import { useState } from "react";

const SelectRole = ({ form, setStep }) => {
  const [activekey, setActiveKey] = useState();
  const [role, setRole] = useState();
  const [error, setError] = useState(false);

  const handleClick = () => {
    if (role) {
      setError(false);
      form.setFieldValue("role", role);
      setStep(3);
    } else {
      setError(true);
    }
  };

  return (
    <div className="text-center">
      <div className="text-[30px] font-medium">Please select your role</div>
      <div className="text-gray-500 mb-[50px]">
        We emailed you a six-digit code to. Enter the code below to confirm your
        email address
      </div>
      <div className="flex gap-[20px] lg:gap-[30px] justify-center">
        <div
          onMouseOver={() => setActiveKey("Student")}
          onMouseOut={() => setActiveKey("")}
          onClick={() => setRole("Student")}
          className="cursor-pointer w-[30%] lg:w-[20%] rounded-lg py-[30px] lg:py-[60px] px-[10px] flex items-center"
          style={{
            border:
              activekey === "Student" || role === "Student"
                ? "1px solid #1677ff"
                : "1px solid #d5d5d5",
          }}
        >
          <img src={Student} alt="Student illustration" />
        </div>
        <div
          onMouseOver={() => setActiveKey("Employee")}
          onMouseOut={() => setActiveKey("")}
          onClick={() => setRole("Employee")}
          className="cursor-pointer w-[30%] lg:w-[20%] rounded-lg py-[30px] lg:py-[60px] px-[10px] flex items-center"
          style={{
            border:
              activekey === "Employee" || role === "Employee"
                ? "1px solid #1677ff"
                : "1px solid #d5d5d5",
          }}
        >
          <img src={Emloyee} alt="Emloyee illustration" />
        </div>
        <div
          onMouseOver={() => setActiveKey("Company")}
          onMouseOut={() => setActiveKey("")}
          onClick={() => setRole("Company")}
          className="cursor-pointer w-[30%] lg:w-[20%] rounded-lg py-[30px] lg:py-[60px] px-[10px] flex items-center"
          style={{
            border:
              activekey === "Company" || role === "Company"
                ? "1px solid #1677ff"
                : "1px solid #d5d5d5",
          }}
        >
          <img src={Company} alt="Business illustration" />
        </div>
      </div>
      <div className="flex gap-[20px] lg:gap-[30px] justify-center mb-[40px] mt-[-30px] lg:mt-[-40px]">
        <div
          className="cursor-pointer w-[30%] lg:w-[20%] text-lg hover:text-[#1677ff]"
          style={{
            color:
              activekey === "Student" || role === "Student" ? "#1677ff" : "",
            fontWeight: activekey === "Student" ? 500 : 400,
          }}
          onMouseOver={() => setActiveKey("Student")}
          onMouseOut={() => setActiveKey("")}
          onClick={() => setRole("Student")}
        >
          Student
        </div>
        <div
          className="cursor-pointer w-[30%] lg:w-[20%] text-lg hover:text-[#1677ff]"
          style={{
            color:
              activekey === "Employee" || role === "Employee" ? "#1677ff" : "",
            fontWeight: activekey === "Employee" ? 500 : 400,
          }}
          onMouseOver={() => setActiveKey("Employee")}
          onMouseOut={() => setActiveKey("")}
          onClick={() => setRole("Employee")}
        >
          Employee
        </div>
        <div
          className="cursor-pointer w-[30%] lg:w-[20%] text-lg hover:text-[#1677ff]"
          style={{
            color:
              activekey === "Company" || role === "Company" ? "#1677ff" : "",
            fontWeight: activekey === "Company" ? 500 : 400,
          }}
          onMouseOver={() => setActiveKey("Company")}
          onMouseOut={() => setActiveKey("")}
          onClick={() => setRole("Company")}
        >
          Business
        </div>
      </div>
      {error && (
        <div className="text-red-600 mb-[10px]">Please select your role!</div>
      )}
      <div className="flex justify-center">
        <button
          onClick={handleClick}
          className="py-3 border w-[400px] bg-blue-700 rounded-lg text-white font-semibold hover:bg-blue-800"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default SelectRole;
