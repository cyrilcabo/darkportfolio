export const GA_TRACKING_ID = "G-H5CQ3BQM15";

export const pageview = (url) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  })
}