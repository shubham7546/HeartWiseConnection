import signupImg from "../assets/Images/signup.webp"
import Template from "../components/core/Auth/Template"

function Signup() {
  return (
    <Template
      title="Join the millions improving their health with HeartWiseConnection for free"
      description1="Take control of your overall well-being today."
      description2="Access resources to support your journey to a healthier life."
      image={signupImg}
      formType="signup"
    />
  );
}

export default Signup;
