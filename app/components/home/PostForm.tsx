import { Form } from "@remix-run/react";
import React, { useState } from "react";
import Button from "../Button";

const PostForm = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedImage(file);
    setPreviewUrl(file ? URL.createObjectURL(file) : null);
  };

  const handleClosePreview = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
  };
  return (
    <section className="sticky top-0 space-y-4 bg-white border-b p-4">
      <input
        type="search"
        placeholder="search"
        className="border-2 border-primary rounded-lg px-2 py-1"
      />

      <Form
        className="flex flex-col gap-4 sticky"
        method="post"
        encType="multipart/form-data"
      >
        <input type="hidden" name="actionType" value="post" />

        <div className="flex flex-col">
          <input
            type="text"
            name="content"
            placeholder={`What's on your mind?`}
            className="border-2 border-primary rounded-lg px-2 py-1"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="image" className="text-sm text-gray-500">
            Add an image
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        {previewUrl && (
          <div className="relative mt-4 max-w-xs w-full h-fit">
            <img
              src={previewUrl}
              alt="Selected Image Preview"
              className="w-full max-w-xs rounded-lg"
            />
            <button
              type="button"
              onClick={handleClosePreview}
              className="absolute top-2 right-2 bg-primary text-white rounded-full px-2 py-1"
            >
              X
            </button>
          </div>
        )}

        <Button type="submit" variant="default" width="w-fit">
          Post!
        </Button>
      </Form>
    </section>
  );
};

export default PostForm;
