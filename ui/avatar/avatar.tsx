import Image from 'next/image';
import './avatar.scss';

interface ImageProps {
  path: string;
  width?: number;
  height?: number;
  alt?: string;
  roundness?: 'none' | 'small' | 'medium' | 'large' | 'full';
}

const Avatar = ({
  path,
  width = 100,
  height = 100,
  alt = 'imagen',
  roundness = 'none',
}: ImageProps) => {
  return (
    <Image
      src={path}
      alt={alt}
      width={width}
      height={height}
      className={`avatar --roundness-${roundness}`}
      style={{
        maxWidth: '100%',
        height: 'auto',
      }}
      unoptimized
    />
  );
};

export default Avatar;
