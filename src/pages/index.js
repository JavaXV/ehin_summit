import React, { useState, useRef, useEffect } from "react"
import Layout from "../components/Layout"
import { FiEdit2, FiChevronLeft } from "react-icons/fi"
import SectionBody from "../components/section_body"
import domtoimage from "dom-to-image"
import GlobalContext from "../contexts/global_context"
//
import campaign from "../images/campaign.jpg"
//
const getThemeButtonColor = themeColor => {
  switch (themeColor) {
    case "pink":
      return "bg-pink-600"
    case "yellow":
      return "bg-yellow-400"
    default:
      return "bg-blue-400"
  }
}
const getThemeButtonHoverColor = themeColor => {
  switch (themeColor) {
    case "pink":
      return "hover:bg-pink-500"
    case "yellow":
      return "hover:bg-yellow-500"
    default:
      return "hover:bg-blue-500"
  }
}
const getThemeTextColor = themeColor => {
  switch (themeColor) {
    case "pink":
      return "text-pink-400"
    case "yellow":
      return "text-yellow-400"
    default:
      return "text-blue-400"
  }
}
const getThemeTextBorderColor = themeColor => {
  switch (themeColor) {
    case "pink":
      return "border-pink-400"
    case "yellow":
      return "border-yellow-400"
    default:
      return "border-blue-400"
  }
}

export default () => {
  const [isOpen, setIsOpen] = useState(true)
  const [isDarkTheme, setIsDarkTheme] = useState(true)
  const [themeColor, setThemeColor] = useState("pink")
  const [avatar, setAvatar] = useState(null)
  const [secureUrl, setSecureUrl] = useState(null)
  const imageRef = useRef()
  const [smallScreen, setSmallScreen] = useState(null)
  const [imageDeg, setImageDeg] = useState(0)
  const [showRotateButtons, setShowRotateButtons] = useState(false)

  const theme = {
    buttonColor: getThemeButtonColor(themeColor),
    buttonHoverColor: getThemeButtonHoverColor(themeColor),
    buttonTextColor: getThemeTextColor(themeColor),
    buttonTextBorderColor: getThemeTextBorderColor(themeColor),
    toggleSwitchColor: "",
  }

  useEffect(() => {
    setSmallScreen(window.matchMedia("(max-width: 700px)"))
  }, [])

  const onClickShare = async () => {
    setSecureUrl({ ...secureUrl, isLoading: true })
    const result = await domtoimage.toJpeg(imageRef.current, { quality: 1 })
    const formData = new FormData()
    formData.append("file", result)
    formData.append("upload_preset", "zofcoc03")

    let response = await fetch(
      "https://api.Cloudinary.com/v1_1/dbdpkkfaf/image/upload",
      {
        method: "POST",
        body: formData,
      }
    )
    response = await response.json()
    setSecureUrl({ link: response.secure_url, isLoading: false })
  }

  const getCroppedImage = result => {
    setAvatar(result)
    setSecureUrl(null)
  }

  const updateSecureUrl = () => {
    setSecureUrl(null)
    setShowRotateButtons(true)
  }

  const rotateRightFunc = () => {
    if (imageDeg >= 360) {
      return
    }
    setImageDeg(value => value + 90)
  }

  const rotateLeftFunc = () => {
    if (imageDeg <= -360) {
      return
    }
    setImageDeg(value => value - 90)
  }

  const onClickDownload = () => {
    domtoimage
      .toJpeg(imageRef.current, { quality: 1 })
      .then(function (dataUrl) {
        var link = document.createElement("a")
        link.download = "Ehingbeti-Summit.jpg"
        link.href = dataUrl
        link.click()
      })
  }

  let left = "350px"
  if (smallScreen && smallScreen.matches) {
    left = "95%"
  }

  return (
    <GlobalContext.Provider value={(isDarkTheme, theme)}>
      <Layout>
        <div
          style={{ maxWidth: isOpen ? left : 0, zIndex: 100000 }}
          className="fixed h-full flex items-end"
        >
          <div
            style={{
              left: isOpen ? 0 : `-${left}`,
              width: isOpen ? left : 0,
            }}
            className={`transition-all relative transition-250 transition-ease ${
              isDarkTheme ? "bg-gray-900" : "bg-gray-100 "
            } shadow-2xl flex-grow h-full`}
          >
            <div className="relative flex-col h-full w-full">
              <div className="flex-grow z-0 h-full">
                <SectionBody
                  getCroppedImage={getCroppedImage}
                  onClickShare={onClickShare}
                  secureUrl={secureUrl}
                  onClickDownload={onClickDownload}
                  showRotateButtons={showRotateButtons}
                  updateSecureUrl={updateSecureUrl}
                  rotateLeftFunc={rotateLeftFunc}
                  rotateRightFunc={rotateRightFunc}
                />
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{
              bottom: 50,
              zIndex: 1000,
              backgroundColor: isDarkTheme ? "black" : "rgb(48, 187, 148)",
            }}
            className="transition-all transition-500 transition-ease relative text-white px-4 h-16 flex items-center text-3xl sm:rounded-none rounded-r-full"
          >
            {isOpen && <FiChevronLeft />}
            {!isOpen && <FiEdit2 />}
          </button>
        </div>
        <MainContent
          avatar={avatar}
          imageRef={imageRef}
          bgImage={campaign}
          smallScreen={smallScreen}
          deg={imageDeg}
        />
      </Layout>
    </GlobalContext.Provider>
  )
}

const MainContent = ({ deg = 0, imageRef, avatar }) => {
  let width = "620px"

  // avatar
  let imgSize = "152px"
  let imgTop = "130px"
  let imgLeft = "235px"

  return (
    <div className="w-full flex items-center justify-center h-screen">
      <div style={{ width: width }} ref={imageRef} className="relative">
        {avatar && (
          <img
            style={{
              width: imgSize,
              height: imgSize,
              top: imgTop,
              left: imgLeft,
              transform: `rotate(${deg}deg)`,
            }}
            src={avatar}
            alt="Avatar"
            className="object-cover absolute rounded-full"
          />
        )}
        <img className="transition-all" src={campaign} alt="Background" />
      </div>
    </div>
  )
}
