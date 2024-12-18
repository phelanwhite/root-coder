// import { useFormik } from "formik";
import { Link } from "react-router-dom";
import avatar from "../assets/profile.png";
// const formik = useFormik({
//     initialValues:{
//         name:''
//     },
//     validate:
// })
const Home = () => {
  return (
    <div className="container mx-auto">
      <div className="flex justify-center items-center h-screen">
        <div>
          <div className="flex flex-col items-center">
            <div className="text-5xl font-bold">Hello Again!</div>
            <div className="py-4 text-xl w-2/3 text-center text-gray-500">
              Explore More by connecting with us.
            </div>
          </div>
          {/* form */}
          <form action="">
            <div className="flex justify-center py-4">
              <img
                src={avatar}
                alt=""
                className=" w-36 h-36 border-4 rounded-full border-gray-100 shadow-lg cursor-pointer hover:bg-gray-200"
              />
              <input type="file" className="hidden" />
            </div>
            <div className="flex flex-col items-center gap-6">
              <input type="text" placeholder="Name" className="text-box" />
              <button type="submit" className="btn">
                Let's go
              </button>
            </div>
            <div className="text-center py-4">
              <span className="text-gray-500">
                Not a Member{" "}
                <Link className="text-red-500" to="/register">
                  Register Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
