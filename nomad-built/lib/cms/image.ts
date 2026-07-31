// Compat shim that replaces Sanity's `@sanity/image-url` urlFor().
//
// Keystatic stores images as local files and the Reader API returns their public
// path (e.g. "/images/projects/foo.jpg"). Components still call
// `urlFor(src).width(1400).height(900).url()`, so we return a chainable object whose
// transform methods are no-ops and whose `.url()` returns the path. Next.js <Image>
// handles the actual resizing/optimisation, so the width/height calls aren't needed.
export type ImageUrlChain = {
  url: () => string
  width: (n?: number) => ImageUrlChain
  height: (n?: number) => ImageUrlChain
  auto: (v?: string) => ImageUrlChain
  format: (v?: string) => ImageUrlChain
  fit: (v?: string) => ImageUrlChain
  crop: (v?: string) => ImageUrlChain
  quality: (n?: number) => ImageUrlChain
}

export function urlFor(source: string | null | undefined): ImageUrlChain {
  const path = typeof source === 'string' ? source : ''
  const chain: ImageUrlChain = {
    url: () => path,
    width: () => chain,
    height: () => chain,
    auto: () => chain,
    format: () => chain,
    fit: () => chain,
    crop: () => chain,
    quality: () => chain,
  }
  return chain
}
