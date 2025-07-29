import React, { useState } from "react";
import axios from '../api/axiosInstance';

function ImageUpload() {
    const [file, setFile] = useState(null);
    const [result, setResult] = useState("");

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await axios.post("/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setResult(res.data);
        } catch (err) {
            console.error(err);
            setResult("❌ 업로드 실패");
        }
    };

    return (
        <div>
            <h2>고양이 vs 강아지 분류기</h2>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <button onClick={handleUpload}>업로드</button>
            <p>결과: {result.result}</p>
        </div>
    );
}

export default ImageUpload;
