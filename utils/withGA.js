export const GA_TRACKING_ID = "UA-170812891-2";

export const pageview = (url) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  })
}