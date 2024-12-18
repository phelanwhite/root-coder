import ButtonComponent from "@/components/form/button-component";
import Loader from "@/components/form/loader";
import { useQuery } from "@tanstack/react-query";
import { MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import Left from "./Left";
import Main from "./Main";
import { useAuthStore } from "@/features/authentication/stores/auth-store";
import { IMAGES_DEFAULT } from "@/constants/images-constant";

const ProfliePage = () => {
  const { getMe, user } = useAuthStore();
  const getMeResult = useQuery({
    queryKey: ["getMe"],
    queryFn: async () => {
      return await getMe();
    },
  });

  return (
    <>
      {getMeResult.isLoading && <Loader />}
      <div className="bg-gray-100 min-h-screen">
        {/* top  */}
        <section className="bg-white pb-4">
          {/* profile picture */}
          <div className="relative mb-14">
            <div className="block aspect-video rounded overflow-hidden w-full h-[150px] md:h-[230px] bg-gray-100">
              <img src={user?.banner} alt="" loading="lazy" />
            </div>
            <div className="absolute -bottom-14 left-4 p-1 bg-white rounded-full">
              <div className="border block rounded-full overflow-hidden w-28 h-28">
                <img
                  src={user?.avatar || IMAGES_DEFAULT.account_notfound}
                  alt=""
                  loading="lazy"
                />
              </div>
            </div>
          </div>
          <div className="space-y-4 px-4">
            <div>
              <span className="font-medium text-xl">{user?.name}</span>
              {user?.nickname && (
                <span className="italic text-sm">({user?.nickname})</span>
              )}
            </div>
            <Link to={`update`} className="inline-block">
              <ButtonComponent
                size="sm"
                className="rounded-lg w-full md:w-max"
                color="success"
                icon={<MdEdit />}
              >
                Update Profile
              </ButtonComponent>
            </Link>
          </div>
        </section>

        {/* body */}
        <div className="p-4 flex gap-4 flex-col md:flex-row">
          {/* left  */}
          <div className="md:max-w-[320px] lg:max-w-[400px] w-full">
            <Left />
          </div>
          {/* right */}
          <div className="flex-1">
            <Main />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfliePage;
