import React from "react";
// import profile from "../images/profile.jpg";
import { FaGithub } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

export default function UserProfile(){
    const data = {
        name: "Ba Gyi Phyo",
        title: "Web Designer / IT-Support",
        social: {
          github: "https://github.com/ThantZinPhyo-OP",
          youtube: "https://www.youtube.com/@burmarom",
          twitter: "https://twitter.com/ThantZinPhyoOP",
          linkedin: "https://www.linkedin.com/in/thantzinphyo11/",
        },
      };
      console.log(data)
    return (
        <div className="w-full">
           
          <div className="flex flex-col justify-center max-w-xs mx-auto bg-white shadow-xl rounded-xl p-5">
            <div className="">
              <img
                className="w-32 mx-auto shadow-xl rounded-full"
                src={''}
                alt="Profile face"
              />
            </div>
            <div className="text-center mt-5">
              <p className="text-xl sm:text-2xl font-semibold text-gray-900">
                {data.name}
              </p>
              <p className="text-xs sm:text-base text-gray-800 pt-2 pb-4 px-5 w-auto inline-block border-b-2">
                {data.title}
              </p>
              <div className="flex align-center justify-center mt-4">
                <a
                  className="text-xl m-1 p-1 sm:m-2 sm:p-2 text-gray-800 hover:bg-gray-800 rounded-full hover:text-white transition-colors duration-300"
                  href={data.github}
                >
                  <FaGithub />
                  <span className="sr-only">Github</span>
                </a>
                <a
                  className="text-xl m-1 p-1 sm:m-2 sm:p-2 text-pink-800 hover:bg-pink-800 rounded-full hover:text-white transition-colors duration-300"
                  href={data.youtube}
                >
                  <FaYoutube />
                  <span className="sr-only">Youtube</span>
                </a>
                <a
                  className="text-xl m-1 p-1 sm:m-2 sm:p-2 text-blue-800 hover:bg-blue-800 rounded-full hover:text-white transition-colors duration-300"
                  href={data.twitter}
                >
                  <FaTwitter />
                  <span className="sr-only">Twitter</span>
                </a>
                <a
                  className="text-xl m-1 p-1 sm:m-2 sm:p-2 text-teal-800 hover:bg-teal-800 rounded-full hover:text-white transition-colors duration-300"
                  href={data.linkedin}
                >
                  <FaLinkedin />
                  <span className="sr-only">Linkedin</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      );
}





