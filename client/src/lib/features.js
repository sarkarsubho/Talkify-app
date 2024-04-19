import moment from "moment";

const fileFormat = (url) => {
  const fileExt = url.split(".").pop();

  if (fileExt === "mp4" || fileExt === "webm" || fileExt === "ogg")
    return "video";
  if (fileExt === "mp3" || fileExt === "wav") return "audio";
  if (
    fileExt === "png" ||
    fileExt === "jpg" ||
    fileExt === "jpeg" ||
    fileExt === "gif"
  )
    return "image";

  return "file";
};

const transFormImage = (url = "", width = 100) => {
  //  dpr_auto/w_${width}/ ==> this is a cloudinary feature that enable us to make the specific size of our content , in side chat message we don't need to bigger images so we can get smaller size of image to perform it quickly load
  // const newUrl = url.replace("upload/", `upload/dpr_auto/w_${width}/`);

  return url;
};

const getLast7Days = () => {
  const currentDate = moment();
  const last7Days = [];
  for (let i = 0; i < 7; i++) {
    const dayDate = currentDate.clone().subtract(i, "days");
    const dayName = dayDate.format("dddd");
    last7Days.unshift(dayName);
    // last7Days.unshift(currentDate.format("MMM D"));
    // currentDate.subtract(1, "days");
  }
  return last7Days;
};

const getOrSaveFromStorage = ({ key, value, get }) => {
  if (get)
    return localStorage.getItem(key)
      ? JSON.parse(localStorage.getItem(key))
      : null;
  else localStorage.setItem(key, JSON.stringify(value));
};

export { fileFormat, transFormImage, getLast7Days, getOrSaveFromStorage };
