export const loaderStyleOverride = {
    display: "flex",
    margin: "0 auto",
    height: "24px",
    justifyContent: "center",
    alignItems: "center",
  };

  export function getCloudinaryUrl(url, { width, height, crop = "fill", quality = "auto" } = {}) {
  if (!url) return "";
  // Solo transforma si es una URL de Cloudinary
  if (!url.includes("res.cloudinary.com")) return url;
  return url.replace(
    "/upload/",
    `/upload/w_${width},h_${height},c_${crop},q_${quality}/`
  );
}