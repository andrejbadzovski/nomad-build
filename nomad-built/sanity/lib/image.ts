import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import type { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder'
import { client } from './client'

const builder = client ? imageUrlBuilder(client) : null

// A minimal stub that satisfies the ImageUrlBuilder chain when Sanity is not configured
function stub(): ImageUrlBuilder {
  const s: any = {
    url: () => '',
    width: () => s,
    height: () => s,
    auto: () => s,
    format: () => s,
    fit: () => s,
    crop: () => s,
    quality: () => s,
    image: () => s,
  }
  return s as ImageUrlBuilder
}

export function urlFor(source: SanityImageSource): ImageUrlBuilder {
  if (!builder) return stub()
  return builder.image(source)
}
