import ButtonComponent from "@/components/form/button-component";
import InputField from "@/components/form/input-field";
import Loader from "@/components/form/loader";
import TextareaField from "@/components/form/textarea-field";
import { IMAGES_DEFAULT } from "@/constants/images-constant";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ChangeEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuthStore } from "../stores/auth-store";

const ProfileUpdateForm = () => {
  const { getMe, updateMe } = useAuthStore();
  const getMeResult = useQuery({
    queryKey: ["getMe"],
    queryFn: async () => {
      return await getMe();
    },
  });
  const updateMeResult = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      Object.entries(formValue).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((item) => {
            formData.append(key, item);
          });
        } else {
          formData.append(key, value as string);
        }
      });

      if (avatarFile) {
        formData.append("avatarFile", avatarFile);
      }
      if (bannerFile) {
        formData.append("bannerFile", bannerFile);
      }

      return await updateMe(formData);
    },
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [formValue, setFormValue] = useState({
    avatar: "",
    banner: "",

    name: "",
    nickname: "",
    phone_number: "",
    address: "",
    bio: "",
    date_of_birth: "",
    email_address: "",

    link_website: "",
    link_instagram: "",
    link_twitter: "",
    link_facebook: "",
    link_linkedin: "",
    link_pinterest: "",
    link_youtube: "",
    link_github: "",

    work: "",
    education: "",
    skills: "",
  });

  // handle form change
  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormValue((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  // handle form submit
  const handleFormSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateMeResult.mutate();
  };

  // update me
  useEffect(() => {
    if (getMeResult.isSuccess && getMeResult.data) {
      for (const key in formValue) {
        setFormValue((prev) => ({
          ...prev,
          ...(getMeResult.data?.data?.[key] && {
            [key]: getMeResult.data?.data?.[key],
          }),
        }));
      }
    }
  }, [getMeResult.data]);

  // render
  return (
    <>
      {(getMeResult.isLoading || updateMeResult.isPending) && <Loader />}
      <div className="bg-gray-100 min-h-screen">
        <form
          onSubmit={handleFormSubmit}
          action=""
          method="post"
          className="flex flex-col gap-4"
        >
          {/* profile picture */}
          <div className="relative mb-14">
            <label
              htmlFor="banner"
              className="block cursor-pointer aspect-video rounded overflow-hidden w-full h-[150px] md:h-[230px] bg-gray-100"
            >
              <img
                src={
                  bannerFile
                    ? URL.createObjectURL(bannerFile)
                    : formValue.banner
                }
                alt=""
                loading="lazy"
              />
              <input
                accept="image/*"
                onChange={(e) => setBannerFile(e.target.files?.[0] as File)}
                type="file"
                id="banner"
                name="banner"
                className="hidden"
              />
            </label>
            <div className="absolute -bottom-14 left-[50%] -translate-x-[50%] p-1 bg-white rounded-full">
              <label
                htmlFor="avatar"
                className="block cursor-pointer rounded-full overflow-hidden w-28 h-28"
              >
                <img
                  src={
                    avatarFile
                      ? URL.createObjectURL(avatarFile)
                      : formValue.avatar
                      ? formValue.avatar
                      : IMAGES_DEFAULT.account_notfound
                  }
                  alt=""
                  loading="lazy"
                />
                <input
                  accept="image/*"
                  onChange={(e) => setAvatarFile(e.target.files?.[0] as File)}
                  type="file"
                  id="avatar"
                  name="avatar"
                  className="hidden"
                />
              </label>
            </div>
          </div>
          {/* input detail */}
          <div className="p-4 space-y-4">
            {/* basic  */}
            <div className="p-4 bg-white shadow rounded">
              <div className="text-xl font-medium mb-4">Basic</div>
              <div className="space-y-4">
                {/* name */}
                <InputField
                  required
                  label="Name"
                  name="name"
                  value={formValue.name || ""}
                  onChange={handleInputChange}
                />
                {/* nickname */}
                <InputField
                  label="Nickname"
                  name="nickname"
                  value={formValue.nickname || ""}
                  onChange={handleInputChange}
                />
                {/* phone number */}
                <InputField
                  label="Phone number"
                  name="phone_number"
                  value={formValue.phone_number || ""}
                  onChange={handleInputChange}
                />
                {/* address */}
                <InputField
                  label="Address"
                  name="address"
                  value={formValue.address || ""}
                  onChange={handleInputChange}
                />
                {/* date of birth */}
                <InputField
                  label="Date of birth"
                  name="date_of_birth"
                  value={formValue.date_of_birth || ""}
                  onChange={handleInputChange}
                  type="date"
                />
                {/* email address */}
                <InputField
                  label="Email address"
                  name="email_address"
                  type="email"
                  value={formValue.email_address || ""}
                  onChange={handleInputChange}
                />
                {/* bio */}
                <TextareaField
                  label="Bio"
                  name="bio"
                  value={formValue.bio || ""}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            {/* social media */}
            <div className="p-4 bg-white shadow rounded">
              <div className="text-xl font-medium mb-4">Social Media</div>
              <div className="space-y-4">
                <InputField
                  label="Website"
                  name="link_website"
                  value={formValue.link_website || ""}
                  onChange={handleInputChange}
                />
                <InputField
                  label="Instagram"
                  name="link_instagram"
                  value={formValue.link_instagram || ""}
                  onChange={handleInputChange}
                />
                <InputField
                  label="Twitter"
                  name="link_twitter"
                  value={formValue.link_twitter || ""}
                  onChange={handleInputChange}
                />
                <InputField
                  label="Facebook"
                  name="link_facebook"
                  value={formValue.link_facebook || ""}
                  onChange={handleInputChange}
                />
                <InputField
                  label="LinkedIn"
                  name="link_linkedin"
                  value={formValue.link_linkedin || ""}
                  onChange={handleInputChange}
                />
                <InputField
                  label="Pinterest"
                  name="link_pinterest"
                  value={formValue.link_pinterest || ""}
                  onChange={handleInputChange}
                />
                <InputField
                  label="YouTube"
                  name="link_youtube"
                  value={formValue.link_youtube || ""}
                  onChange={handleInputChange}
                />
                <InputField
                  label="GitHub"
                  name="link_github"
                  value={formValue.link_github || ""}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            {/* Work and education*/}
            <div className="p-4 bg-white shadow rounded">
              <div className="text-xl font-medium mb-4">Work and education</div>
              <div className="space-y-4">
                <TextareaField
                  label="Work"
                  name="work"
                  value={formValue.work || ""}
                  onChange={handleInputChange}
                />
                <TextareaField
                  label="Education"
                  name="education"
                  value={formValue.education || ""}
                  onChange={handleInputChange}
                />
                <TextareaField
                  label="Skills"
                  content="What tools and languages are you most experienced with? Are you specialized or more of a generalist?"
                  name="skills"
                  value={formValue.skills || ""}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            {/* submit button */}
            <ButtonComponent
              type="submit"
              disabled={updateMeResult.isPending}
              size="sm"
              color="black"
              className="block w-full"
            >
              Update Profile
            </ButtonComponent>
          </div>
        </form>
      </div>
    </>
  );
};

export default ProfileUpdateForm;
