export default function VideoEmbed({ url }) {
  if (!url) {
    return (
      <div className="aspect-video bg-gray-200 rounded-xl flex items-center justify-center text-gray-500">
        Video placeholder
      </div>
    )
  }
  return (
    <div className="aspect-video rounded-xl overflow-hidden">
      <iframe src={url} className="w-full h-full" allowFullScreen title="Video" />
    </div>
  )
}
