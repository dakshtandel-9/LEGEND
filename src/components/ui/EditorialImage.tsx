"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useRef, useState } from "react";

type EditorialImageProps = ImageProps & { parallax?: boolean };

/** Native lazy loading keeps images out of the initial request queue.
 * The server-rendered image stays usable without JavaScript; cached images,
 * failed requests and reduced motion never leave a permanent loading mask.
 */
export function EditorialImage({ parallax = false, priority, fill, alt, onLoad, onError, ...props }: EditorialImageProps) {
  const imageRef = useRef<HTMLImageElement>(null);
  const [enhanced, setEnhanced] = useState(false);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    setEnhanced(true);
    const image = imageRef.current;
    setStatus(image?.complete ? (image.naturalWidth > 0 ? "ready" : "error") : "loading");
  }, [props.src]);

  return (
    <span className={`editorial-image ${fill ? "editorial-image-fill" : "editorial-image-cover"}`}
      data-media-enhanced={enhanced} data-media-status={status} data-priority={priority || undefined}
      data-parallax={parallax ? "image" : undefined}>
      <Image {...props} ref={imageRef} alt={alt} fill={fill} priority={priority}
        loading={priority ? undefined : "lazy"}
        onLoad={(event) => { setStatus("ready"); onLoad?.(event); }}
        onError={(event) => { setStatus("error"); onError?.(event); }} />
      <span className="image-loading-sheen" aria-hidden="true" />
      {status === "error" && <span className="image-load-error">{alt}<span>Image unavailable</span></span>}
    </span>
  );
}
