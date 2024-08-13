const FeatureSection: React.FC<{
    title: string;
    description: string;
    imageSrc: string;
    videoSrc?: string;
    isReversed?: boolean;
    videoWatchEverywere?: string;
  }> = ({
    title,
    description,
    imageSrc,
    videoSrc,
    isReversed = false,
    videoWatchEverywere,
  }) => (
    <section className="py-16 border-t-8 rounded-lg" style={{ borderColor: 'rgb(45, 45, 45)' }}>
      <div
        className={`container mx-auto px-4 flex flex-col ${
          isReversed ? "md:flex-row-reverse" : "md:flex-row"
        } items-center`}
      >
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h2 className="text-4xl font-bold mb-4">{title}</h2>
          <p className="text-xl">{description}</p>
        </div>
        <div className="md:w-1/2 relative">
          <img
            src={imageSrc}
            alt={title}
            className="w-full z-10 relative bg-cover"
          />
          {videoSrc && (
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
              <video autoPlay loop muted className="w-[73%] h-[60%] object-cover">
                <source src={videoSrc} type="video/mp4" />
              </video>
            </div>
          )}
          {videoWatchEverywere && (
            <div className="absolute inset-0 flex  justify-center">
              <video
                autoPlay
                loop
                muted
                className="w-[65%] h-[45%] mt-12 object-cover"
              >
                <source src={videoWatchEverywere} type="video/mp4" />
              </video>
            </div>
          )}
        </div>
      </div>
    </section>
);

export default FeatureSection