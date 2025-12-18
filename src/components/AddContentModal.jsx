

import { X } from "lucide-react";
import { useState } from "react";

/* ===================== BANNER FORM ===================== */
function BannerForm({ onSubmit }) {
  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    status: "Published",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({ ...form, [name]: files ? files[0] : value });
  };

  const handleSubmit = () => {
    onSubmit({ type: "banner", ...form });
  };

  return (
    <div className="flex flex-col space-y-3">
      <input name="title" placeholder="Banner Title" onChange={handleChange} className="input border p-2 rounded-md" />
      <input name="subtitle" placeholder="Subtitle" onChange={handleChange} className="input border p-2 rounded-md" />
      <input type="file" name="image" onChange={handleChange} className="input border p-2 rounded-md" />
      <select name="status" onChange={handleChange} className="input border p-2 rounded-md">
        <option>Published</option>
        <option>Draft</option>
      </select>
      <button onClick={handleSubmit} className="bg-green-600 text-white py-2 rounded-md hover:bg-green-700">
        Save Banner
      </button>
    </div>
  );
}

/* ===================== BLOG FORM ===================== */
function BlogForm({ onSubmit }) {
  const [form, setForm] = useState({
    title: "",
    content: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({ ...form, [name]: files ? files[0] : value });
  };

  return (
    <div className="flex flex-col space-y-3">
      <input name="title" placeholder="Blog Title" onChange={handleChange} className="input border p-2 rounded-md border border-gray-300" />
      <textarea name="content" placeholder="Content" onChange={handleChange} className="input h-24 border p-2 rounded-md border border-gray-300" />
      <input type="file" name="image" onChange={handleChange} className="input border p-2 rounded-md border border-gray-300" />
      <button
        onClick={() => onSubmit({ type: "blog", ...form })}
        className="bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
      >
        Publish Blog
      </button>
    </div>
  );
}

/* ===================== MEDIA FORM ===================== */
function MediaForm({ onSubmit }) {
  const [form, setForm] = useState({
    title: "",
    mediaType: "Image",
    file: null,
    preview: "",
  });

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setForm({ ...form, [name]: files ? files[0] : value });
//   };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const file = files[0];
      setForm({
        ...form,
        file,
        preview: URL.createObjectURL(file), // ✅ important
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = () => {
    if (!form.file) return;

    onSubmit({
      id: Date.now(),
      type: "media",
      title: form.title,
      mediaType: form.mediaType,
      file: form.file,
      preview: form.preview, 
    });
  };

  return (
    <div className="flex flex-col space-y-3">
      <input name="title" placeholder="Media Title" onChange={handleChange} className="input border p-2 rounded-md border border-gray-300" />
      <input type="file" name="file" onChange={handleChange} className="input border p-2 rounded-md border border-gray-300" />
      <select name="mediaType" onChange={handleChange} className="input border p-2 rounded-md border border-gray-300">
        <option>Image</option>
        <option>Video</option>
      </select>

      {form.preview && (
        <div className="border rounded-md p-2">
          {form.mediaType === "Image" ? (
            <img
              src={form.preview}
              alt="preview"
              className="h-32 object-cover rounded"
            />
          ) : (
            <video
              src={form.preview}
              controls
              className="h-32 rounded"
            />
          )}
        </div>
      )}

      <button
        onClick={() => onSubmit({ type: "media", ...form })}
        className="bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
      >
        Upload Media
      </button>
    </div>
  );
}

/* ===================== PAGE FORM ===================== */
function PageForm({ onSubmit }) {
  const [form, setForm] = useState({
    title: "",
    content: "",
  });

  return (
    <div className="flex flex-col space-y-3">
      <input
        placeholder="Page Title"
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        className="input border p-2 rounded-md border border-gray-300"
      />
      <textarea
        placeholder="Page Content"
        onChange={(e) => setForm({ ...form, content: e.target.value })}
        className="input h-28 border p-2 rounded-md border border-gray-300"
      />
      <button
        onClick={() => onSubmit({ type: "page", ...form })}
        className="bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
      >
        Save Page
      </button>
    </div>
  );
}

/* ===================== MAIN MODAL ===================== */


export default function AddContentModal({ onClose, onSave }) {
  const [type, setType] = useState("");

  const handleSubmit = (data) => {
    console.log("SUBMITTED DATA 👉", data);
    onSave(data);
    /*
      API example:
      const formData = new FormData();
      Object.keys(data).forEach(key => formData.append(key, data[key]));
      axios.post("/api/content", formData);
    */

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-3">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-4 md:p-6 relative">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Add New Content</h3>
          <button onClick={onClose}><X /></button>
        </div>

        <label className="text-sm font-medium">Select Content Type</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full mt-1 border border-gray-300 rounded-md p-2"
        >
          <option value="">-- Select --</option>
          <option value="banner">Banner</option>
          <option value="blog">Blog / News</option>
          <option value="media">Media Gallery</option>
          <option value="page">Page</option>
        </select>

        <div className="mt-4">
          {type === "banner" && <BannerForm onSubmit={handleSubmit} />}
          {type === "blog" && <BlogForm onSubmit={handleSubmit} />}
          {type === "media" && <MediaForm onSubmit={handleSubmit} />}
          {type === "page" && <PageForm onSubmit={handleSubmit} />}
        </div>
      </div>
    </div>
  );
}
