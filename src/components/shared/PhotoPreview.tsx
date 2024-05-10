
type PhotoPreviewProps = {
  photo: string,
}

const PhotoPreview = ({photo}: PhotoPreviewProps) => {
  return (
    <div>
      <h3 className="text-[25px] font-[500]">Photo Preview</h3>
      <img src={photo} className="w-full h-full" alt="Captured" />
    </div>
  )
}

export default PhotoPreview