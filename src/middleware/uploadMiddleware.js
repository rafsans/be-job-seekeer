import multer from "multer";
import path from "path";
// Using memoryStorage because we're uploading to S3 directly
const storage = multer.memoryStorage();
export const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = [".pdf", ".doc", ".docx"];
        const ext = path.extname(file.originalname).toLowerCase();
        if (allowedTypes.includes(ext)) {
            cb(null, true);
        }
        else {
            cb(new Error("Invalid file type. Only PDF, DOC, and DOCX are allowed."));
        }
    },
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
    },
});
