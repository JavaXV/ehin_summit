import React, { useState, useRef, useContext } from "react"
import Cropper from "react-cropper"
import "cropperjs/dist/cropper.css"
import GlobalContext from "../contexts/global_context"

import defaultImage from "../images/avatar.png"
import defaultImageDark from "../images/avatar_dark.png"

const UploadImage = ({ title, getCroppedImage, updateSecureUrl }) => {
  // const src = defaultImage
  // const src = "../images/avatar.png"
  const cropper = useRef(null)
  const isDarkTheme = useContext(GlobalContext)
  const [state, setState] = useState({
    src: isDarkTheme ? defaultImageDark : defaultImage,
    cropResult: null,
  })

  const onChange = e => {
    e.preventDefault()
    let files
    if (e.dataTransfer) {
      files = e.dataTransfer.files
    } else if (e.target) {
      files = e.target.files
    }
    const reader = new FileReader()
    reader.onload = () => {
      setState({ src: reader.result })
    }
    reader.readAsDataURL(files[0])
    updateSecureUrl()
  }

  const cropImage = () => {
    getCroppedImage(cropper.current.cropper.getCroppedCanvas().toDataURL())
    updateSecureUrl()
  }

  const crop = () => {
    if (typeof cropper.current.cropper.getCroppedCanvas() === "undefined") {
      return
    }
  }

  return (
    <div className="mb-2">
      <h3
        className={`${
          isDarkTheme ? "text-gray-300 " : "text-gray-700 "
        } mb-3 font-bold`}
      >
        {title}
      </h3>
      <div>
        <Cropper
          style={{ height: 250, width: 250 }}
          initialAspectRatio={1 / 1}
          guides={false}
          src={state.src}
          ref={cropper}
          viewMode={1}
          dragMode="move"
          cropBoxMovable={false}
          crop={crop}
        />
        <input className="mt-5" type="file" onChange={onChange} />

        <button
          onClick={cropImage}
          className="mt-2 border border-gray-400 px-3 py-1 rounded-sm text-normal font-bold"
        >
          Crop and Upload
        </button>
      </div>
    </div>
  )
}

export default UploadImage
