import Image from "next/legacy/image";
import "./avatar.scss";

interface ImageProps {
  path: string;
  width?: number;
  height?: number;
  alt?: string;
  roundness?: "none" | "small" | "medium" | "large" | "full";
}

const Avatar = ({
  path,
  width = 100,
  height = 100,
  alt = "imagen",
  roundness = "none",
}: ImageProps) => {
  return (
    <Image
      src={path}
      alt={alt}
      width={width}
      height={height}
      className={`avatar --roundness-${roundness}`}
    ></Image>
  );
};

export default Avatar;
