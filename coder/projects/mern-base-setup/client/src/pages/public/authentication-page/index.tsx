import { ICONS_DEFAULT } from "@/constants/images-constant";
import ForgotPasswordForm from "@/features/authentication/components/ForgotPasswordForm";
import ResetPasswordForm from "@/features/authentication/components/ResetPasswordForm";
import SigninForm from "@/features/authentication/components/SigninForm";
import SignupForm from "@/features/authentication/components/SignupForm";
import SocialButtons from "@/features/authentication/components/SocialButtons";
import { Link, useLocation } from "react-router-dom";

const AuthenticationPage = () => {
  const location = useLocation();
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="max-w-[560px] w-full p-4 flex flex-col justify-center gap-8">
        {/* top  */}
        <div className="flex flex-col gap-4">
          <Link to={`/`} className="w-14 inline-block mx-auto">
            <img src={ICONS_DEFAULT.logo_svg} alt="" />
          </Link>
          <div className="text-center text-2xl font-bold">
            Join the PLW Community
          </div>
        </div>
        {/* form  */}
        {location.pathname.includes(`signin`) && <SigninForm />}
        {location.pathname.includes(`signup`) && <SignupForm />}
        {location.pathname.includes(`forgot-password`) && (
          <ForgotPasswordForm />
        )}
        {location.pathname.includes(`reset-password`) && <ResetPasswordForm />}
        {/* social media buttons */}
        <div className="flex items-center gap-3 leading-none">
          <hr className="flex-1 mt-1" />
          <span>or</span>
          <hr className="flex-1 mt-1" />
        </div>
        <SocialButtons />
        {/* bottom */}
        <div className="text-center text-sm italic text-gray-500">
          By signing up, you are agreeing to our privacy policy, terms of use
          and code of conduct.
        </div>
        {/* switch between signup and signin */}
        {location.pathname.includes("signin") ? (
          <div className="text-center text-sm">
            Don't have an account?{" "}
            <Link to={`/signup`} className="text-blue-500 text-link">
              Signup
            </Link>
          </div>
        ) : (
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link to={`/signin`} className="text-blue-500">
              Signin
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthenticationPage;
