const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

// アップロードフォルダを作成（なければ作成）
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Multer 設定（ファイルの保存先とファイル名を固定）
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, "uploaded_image.jpg"); // 常に上書き
    },
});
const upload = multer({ storage });

// 静的ファイル（アップロード画像を公開）
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// 画像アップロードAPI
app.post("/upload", upload.single("image"), (req, res) => {
    res.send("画像がアップロードされました！");
});

// サーバー起動
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
