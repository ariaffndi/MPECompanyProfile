type MapEmbedProps = {
    src: string;
    className?: string;
};

const MapEmbed = ({ src, className = '' }: MapEmbedProps) => {
    return (
        <div className={`my-10 aspect-video w-full ${className}`}>
            <iframe src={src} className="h-full w-full border-0" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
    );
};

export default MapEmbed;
