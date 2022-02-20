import React, { useContext } from "react"
import UploadImage from "./upload_image"
import ShareComponent from "./share_component"
import GlobalContext from "../contexts/global_context"

const SectionBody = ({
  getCroppedImage,
  onClickShare,
  onClickDownload,
  secureUrl,
  updateSecureUrl,
  rotateRightFunc,
  rotateLeftFunc,
  showRotateButtons,
}) => {
  const isDarkTheme = useContext(GlobalContext)
  return (
    <div
      style={{ fontSize: "16px" }}
      className="relative h-full overflow-hidden"
    >
      <div
        className={`p-4 pt-12 pb-32 ${
          isDarkTheme ? "text-gray-200" : "text-gray-700"
        } overflow-y-auto h-full`}
      >
        <div className="mb-12">
          <UploadImage
            updateSecureUrl={updateSecureUrl}
            getCroppedImage={getCroppedImage}
            title="Upload Image"
          />
          {/* rotate buttons */}
          {showRotateButtons && (
            <div className="grid grid-cols-2 gap-5">
              <button
                className="p-1 rounded-sm border-gray-400 border"
                onClick={rotateLeftFunc}
                type="button"
              >
                Rotate Left
              </button>
              <button
                className="p-1 rounded-sm border-gray-400 border"
                onClick={rotateRightFunc}
                type="button"
              >
                Rotate Right
              </button>
            </div>
          )}
        </div>
      </div>
      <CMSFooter
        onClickShare={onClickShare}
        showComponent={true}
        onClickDownload={onClickDownload}
        secureUrl={secureUrl}
      />
    </div>
  )
}

export default SectionBody

const CMSFooter = ({
  showComponent,
  onClickDownload,
  secureUrl,
  onClickShare,
}) => {
  const isDarkTheme = useContext(GlobalContext)
  const theme = useContext(GlobalContext)
  return showComponent ? (
    <div
      className={`${
        isDarkTheme ? "bg-gray-900 border-t border-black" : "bg-white "
      } shadow-md absolute px-8 py-4 w-full bottom-0 items-center`}
    >
      <ShareComponent secureUrl={secureUrl} onShareButtonClick={onClickShare} />
      <button
        onClick={onClickDownload}
        className={`w-full font-bold ${theme.buttonColor} ${theme.buttonHoverColor} flex-grow text-white rounded-full px-10 py-2`}
      >
        Download{" "}
      </button>
    </div>
  ) : (
    <>hide</>
  )
}
