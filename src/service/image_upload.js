class ImageUploader {
  // 이미지 업로드, 서버에 이미지 업로드
  // cloudinary REST API 이용
  async upload(file) {
    const formData = new FormData();
    const url = "https://api.cloudinary.com/v1_1/demo/image/upload";

    formData.append("file", file);
    formData.append("upload_preset", "docs_upload_example_us_preset");

    const result = await fetch(url, {
      method: "POST",
      body: formData
    });

    return await result.json();
  }
}

export default ImageUploader;
