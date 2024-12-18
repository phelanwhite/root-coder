import { useAuthStore } from "@/features/authentication/stores/auth-store";
import React, { memo, useMemo } from "react";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaPinterest,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { Link } from "react-router-dom";

const Left = () => {
  const { user } = useAuthStore();
  const social_media = useMemo(() => {
    if (!user) return [];
    return [
      {
        name: "Twitter",
        link: user.link_twitter,
        icon: <FaTwitter />,
      },
      {
        name: "LinkedIn",
        link: user.link_linkedin,
        icon: <FaLinkedin />,
      },
      {
        name: "GitHub",
        link: user.link_github,
        icon: <FaGithub />,
      },
      {
        name: "Instagram",
        link: user.link_instagram,
        icon: <FaInstagram />,
      },
      {
        name: "Facebook",
        link: user.link_facebook,
        icon: <FaFacebook />,
      },
      {
        name: "Pinterest",
        link: user.link_pinterest,
        icon: <FaPinterest />,
      },
      {
        name: "Youtube",
        link: user.link_youtube,
        icon: <FaYoutube />,
      },
    ];
  }, [user]);
  console.log({
    social_media,
  });

  return (
    <section>
      <div className="shadow bg-white rounded p-4 space-y-4 text-sm">
        <div className="text-xl font-medium">Intro</div>
        <div className="text-center">{user?.bio}</div>
        {/*  */}
        <div className="border-t pt-3 space-y-3">
          <>
            {user &&
              Object.entries(user)
                .filter(([key, value]) =>
                  [`address`, `email_address`, `phone_number`].includes(key)
                )
                .map(([key, value]) => (
                  <div key={key} className="space-y-0.5">
                    <div className="font-medium capitalize">
                      {key.replace("_", " ")}
                    </div>
                    <div>{value as string}</div>
                  </div>
                ))}
          </>
          <div className="space-y-1">
            <div className="font-medium capitalize">social media</div>
            <div className="flex flex-wrap gap-3">
              {social_media.map((item) => (
                <Link
                  key={item.name}
                  to={item.link}
                  className="text-base hover:opacity-70"
                >
                  {item.icon}
                </Link>
              ))}
            </div>
          </div>
        </div>
        {/*  */}
        <div className="border-t pt-3 space-y-3">
          <>
            {user &&
              Object.entries(user)
                .filter(([key, value]) =>
                  [`work`, `education`, `skills`].includes(key)
                )
                .map(([key, value]) => (
                  <div key={key} className="space-y-0.5">
                    <div className="font-medium capitalize">{key}</div>
                    <div>{value as string}</div>
                  </div>
                ))}
          </>
          {user?.link_website && (
            <div className="space-y-0.5">
              <div className="font-medium capitalize">link website</div>
              <div>
                <Link
                  to={user?.link_website}
                  className="line-clamp-1 text-link"
                >
                  {user?.link_website}
                </Link>
              </div>
            </div>
          )}
        </div>
        {/*  */}
        <div className="border-t pt-3 flex items-center justify-center gap-1">
          <MdDateRange />
          <span>
            Joined on {new Date(user?.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </section>
  );
};

export default memo(Left);
