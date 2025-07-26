export default function CollectionsCard({ title, subtitle, imageUrl }) {
  return (
    <div className="relative aspect-[3/4] rounded-sm overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      <div className="absolute inset-0 flex flex-col justify-end p-2">
        <div
          className="bg-black/60 backdrop-blur-[1px] px-1 py-2 rounded-md w-full text-center"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          <span className="font-medium text-white text-[10px] tracking-wide">
            {title}
          </span>
        </div>
      </div>

      <div className="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/10" />
    </div>
  );
}
