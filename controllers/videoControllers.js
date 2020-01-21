export const home = (req, res) => res.render("home", { pageTitle: "Home" });
export const search = (req, res) => res.render("Serch");

export const videos = (req, res) => res.render("Videos");
export const upload = (req, res) => res.render("Upload");
export const videoDetail = (req, res) => res.render("Video Detail");
export const editVideo = (req, res) => res.render("Edit Video");
export const deleteVideo = (req, res) => res.render("Delete Video");