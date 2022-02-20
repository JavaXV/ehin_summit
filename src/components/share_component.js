import React, { useContext } from "react"
import { BiShare } from "react-icons/bi"
import GlobalContext from "../contexts/global_context"
import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share"

const ShareComponent = ({ onShareButtonClick, secureUrl }) => {
  const isLoading = secureUrl && secureUrl.isLoading
  const theme = useContext(GlobalContext)
  return (
    <div>
      <div className={` ${secureUrl ? "flex" : "hidden"}`}>
        {isLoading ? (
          <div className="text-gray-400 w-full text-center p-3">
            Loading, please wait...
          </div>
        ) : (
          <Buttons secureUrl={secureUrl} />
        )}
      </div>
      <button
        onClick={onShareButtonClick}
        className={`w-full flex justify-center items-center mb-2 font-bold border ${theme.buttonTextColor} ${theme.buttonTextBorderColor} flex-grow rounded-full px-10 py-2`}
      >
        <span className="block mr-2">
          <BiShare />
        </span>
        Share{" "}
      </button>
    </div>
  )
}

export default ShareComponent

const Buttons = ({ secureUrl }) => {
  const title =
    "We're Creating a Greater Lagos. Join us in Setting The Tone For The Next Decade."
  const url = secureUrl && secureUrl.link
  return (
    <div className="flex space-x-2 mb-5 items-center justify-center">
      <button className="text-sm text-gray-500 font-bold">Share </button>
      {/* share section */}
      <FacebookShareButton url={url} quote={title}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      {/*  */}
      <TwitterShareButton url={url} title={title}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>
      {/*  */}
      <WhatsappShareButton url={url} title={title} separator=":: ">
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>
      {/*  */}
      <LinkedinShareButton url={url}>
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>
      {/*  */}
      <EmailShareButton url={url} subject={title} body={title}>
        <EmailIcon size={32} round />
      </EmailShareButton>
    </div>
  )
}
