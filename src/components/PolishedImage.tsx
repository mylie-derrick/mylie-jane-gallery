import { useEffect, useRef, useState, type ImgHTMLAttributes } from "react";

type PolishedImageProps = ImgHTMLAttributes<HTMLImageElement>;

export function PolishedImage({ className = "", onLoad, ...props }: PolishedImageProps) {
  const imageRef = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (imageRef.current?.complete) {
      setLoaded(true);
    }
  }, [props.src]);

  return (
    <img
      {...props}
      ref={imageRef}
      data-loaded={loaded ? "true" : "false"}
      onLoad={(event) => {
        setLoaded(true);
        onLoad?.(event);
      }}
      className={`artwork-image-fade ${className}`}
    />
  );
}
