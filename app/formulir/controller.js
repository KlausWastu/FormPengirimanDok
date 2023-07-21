module.exports = {
  index: (req, res) => {
    try {
      res.render("index", {
        title: "Formulir Pengiriman",
      });
    } catch (err) {
      console.log(err);
    }
  },
};
