export function ExtractYouTubeId(url: string) {

  // shorts
  if (url.includes("/shorts/")) {
    return url.split("/shorts/")[1].split("?")[0]
  }

  // normal youtube
  if (url.includes("v=")) {
    return url.split("v=")[1].split("&")[0]
  }

  return null
}