import React, { useEffect, useRef, useState } from 'react'
import PlaceholderImage from '@/assets/placeholder_image.jpg'

interface LazyImageProps {
  src: string
  alt: string
  className?: string
  titleImage?: string
  loading?: 'lazy' | 'eager'
  width: number | string
  height: number | string
  placeholderSrc?: string
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className,
  width,
  height,
  loading = 'lazy',
  titleImage,
  placeholderSrc,
  ...props
}) => {
  const imageRef = useRef<HTMLImageElement | null>(null)
  const [shouldLoad, setShouldLoad] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  const placeholder = placeholderSrc || src

  const handleLoad = () => setIsLoaded(true)

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setShouldLoad(true)
          if (imageRef.current) {
            observer.unobserve(imageRef.current)
          }
        }
      })
    })

    if (imageRef.current) observer.observe(imageRef.current)

    return () => {
      if (imageRef.current) observer.unobserve(imageRef.current)
    }
  }, [src])

  return (
    <img
        {...props}
      ref={imageRef}
      width={width}
      height={height}
      alt={alt}
      loading={loading}
      className={`${className} transition-all duration-300 ${isLoaded ? 'opacity-100 blur-0' : 'opacity-30 blur-sm'}`}
      title={titleImage || alt}
      src={shouldLoad ? src : placeholder}
      onLoad={handleLoad}
      onError={e => {
        e.currentTarget.onerror = null
        e.currentTarget.src = PlaceholderImage
      }}
    />
  )
}

export default LazyImage
