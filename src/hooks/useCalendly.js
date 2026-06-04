import siteConfig from '../config/siteConfig'

export function openCalendly(e) {
  if (e) e.preventDefault()
  if (window.Calendly) {
    window.Calendly.initPopupWidget({ url: siteConfig.calendlyUrl })
  } else {
    // Fallback: open in new tab if script hasn't loaded
    window.open(siteConfig.calendlyUrl, '_blank')
  }
}
