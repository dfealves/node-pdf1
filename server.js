const app = require("./config/express")();
const fs = require("fs");
const pdf = require("html-pdf");

const generatePDF = (res) => {
  const html = fs.readFileSync("index.html").toString();

  const options = {
    type: "pdf",
    format: "A4",
    orientation: "portrait",
  };

  pdf.create(html, options).toBuffer((err, buffer) => {
    if (err) return res.status(500).json(err);

    res.end(buffer);
  });
};

app.post("/generate-pdf", generatePDF);

app.listen(() => {
  console.log(`Servidor rodando na porta 3000`);
});
