import React, { useState } from "react";
import {
  Edit,
  Trash2,
  Plus,
  Image as ImageIcon,
  Newspaper,
  Video,
  Globe,
  Menu,
  X,
  Eye,
} from "lucide-react";
import AddContentModal from "./AddContentModal";
import MediaPreviewModal from "./MediaPreviewModal";

export default function WebsiteContentManagement() {
  const tabs = ["Banners", "Blogs/News", "Media Gallery", "Pages"];
  const [active, setActive] = useState("Banners");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [contents, setContents] = useState([]);
  const [editingContent, setEditingContent] = useState(null);

  const handleEdit = (item) => {
    setEditingContent(item);
    setShowAddModal(true);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    setContents((prev) => prev.filter((c) => c.id !== id));
  };

  const handleSaveContent = (content) => {
    if (editingContent) {
      // UPDATE
      setContents((prev) =>
        prev.map((c) => (c.id === editingContent.id ? { ...c, ...content } : c))
      );
    } else {
      // ADD
      setContents((prev) => [{ id: Date.now(), ...content }, ...prev]);
    }

    setEditingContent(null);
    setShowAddModal(false);
  };

  const handleAddContent = (newContent) => {
    setContents((prev) => [{ id: Date.now(), ...newContent }, ...prev]);
  };

  const handleTabClick = (tab) => {
    setActive(tab);
    setShowMobileMenu(false);
  };

  return (
    <div className="p-4 md:p-6 w-full bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-3 mb-6">
        <div>
          <h2 className="text-xl font-semibold">Website Content Management</h2>
          <p className="text-gray-500 text-sm">
            Manage your website content, banners, and pages
          </p>
        </div>

        <button
          onClick={() =>{ 
            setEditingContent(null); 
            setShowAddModal(true)}}
          className="px-4 py-2 bg-green-600 text-white flex items-center gap-1 rounded-md hover:bg-green-700"
        >
          <Plus size={18} /> Add New
        </button>

        {showAddModal && (
          <AddContentModal
            onClose={() => {
              setShowAddModal(false);
              setEditingContent(null);
            }}
            onSave={handleSaveContent}
            editData={editingContent}
          />
        )}
      </div>

      {/* Card */}
      <div className="bg-white shadow rounded-lg p-3 md:p-4">
        {/* Desktop Tabs */}
        <div className="hidden md:flex gap-6 border-b border-gray-200 overflow-x-auto mb-4">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setActive(t)}
              className={`pb-2 flex items-center gap-2 whitespace-nowrap transition-all ${
                active === t
                  ? "border-b-2 border-green-500 text-green-600 font-medium"
                  : "text-gray-500"
              }`}
            >
              {t === "Banners" && <ImageIcon size={18} />}
              {t === "Blogs/News" && <Newspaper size={18} />}
              {t === "Media Gallery" && <Video size={18} />}
              {t === "Pages" && <Globe size={18} />}
              {t}
            </button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden border-b border-gray-200 mb-4 pb-2 flex justify-between items-center">
          <p className="text-green-600 font-medium flex gap-2 items-center">
            {active === "Banners" && <ImageIcon size={18} />}
            {active === "Blogs/News" && <Newspaper size={18} />}
            {active === "Media Gallery" && <Video size={18} />}
            {active === "Pages" && <Globe size={18} />}
            {active}
          </p>

          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="px-2 py-1 rounded text-gray-600 border border-gray-300"
          >
            {showMobileMenu ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {showMobileMenu && (
          <div className="md:hidden flex flex-col gap-2 mb-4 bg-gray-50 p-2 rounded border border-gray-300 shadow-sm">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => handleTabClick(t)}
                className={`flex items-center gap-2 px-3 py-2 rounded text-left ${
                  active === t
                    ? "bg-green-100 text-green-600 font-medium"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                {t === "Banners" && <ImageIcon size={18} />}
                {t === "Blogs/News" && <Newspaper size={18} />}
                {t === "Media Gallery" && <Video size={18} />}
                {t === "Pages" && <Globe size={18} />}
                {t}
              </button>
            ))}
          </div>
        )}

        {/* Tab Contents */}
        {/* <div className="mt-2">
          {active === "Banners" && <BannersTab />}
          {active === "Blogs/News" && <BlogsTab />}
          {active === "Media Gallery" && <MediaTab />}
          {active === "Pages" && <PagesTab />}
        </div> */}
        <div className="mt-2">
          {active === "Banners" && (
            <BannersTab
              data={contents.filter((c) => c.type === "banner")}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
          {active === "Blogs/News" && (
            <BlogsTab
              data={contents.filter((c) => c.type === "blog")}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
          {active === "Media Gallery" && (
            <MediaTab
              data={contents.filter((c) => c.type === "media")}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
          {active === "Pages" && (
            <PagesTab
              data={contents.filter((c) => c.type === "page")}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>
    </div>
  );
}

/* ************************ BANNERS ************************ */

function BannersTab({ data, onEdit, onDelete }) {
  const [previewMedia, setPreviewMedia] = useState(null);

  if (!data.length)
    return <p className="text-gray-500">No banners added yet.</p>;

  return (
    <div className="space-y-4">
      {data.map((b, i) => {
        // ✅ Detect media type safely
        const mediaType = b.image?.type?.startsWith("image")
          ? "Image"
          : "Video";

        return (
          <div
            key={i}
            className="bg-white border border-gray-200 rounded-xl p-3 md:p-4 shadow flex flex-col md:flex-row md:items-center justify-between gap-3"
          >
            {/* Media */}
            <div className="flex items-center gap-4 flex-1">
              {mediaType === "Image" ? (
                <img
                  src={URL.createObjectURL(b.image)}
                  alt={b.title}
                  className="w-28 h-16 object-cover rounded-md border border-gray-200"
                />
              ) : (
                <video
                  src={URL.createObjectURL(b.image)}
                  className="w-28 h-16 object-cover rounded-md border border-gray-200"
                  muted
                />
              )}

              <div>
                <h3 className="font-semibold text-sm md:text-base">
                  {b.title}
                </h3>
                <p className="text-sm text-gray-500">{b.sub}</p>
                <span
                  className={`text-xs px-2 py-1 rounded mt-2 inline-block ${
                    b.status === "Published"
                      ? "bg-green-100 text-green-600"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {b.status}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 justify-end">
              <button
                className="text-gray-600 hover:text-gray-800"
                onClick={() =>
                  setPreviewMedia({
                    ...b,
                    mediaType,
                    preview: URL.createObjectURL(b.image),
                  })
                }
                title="Preview"
              >
                <Eye size={18} />
              </button>

              <button
                className="text-blue-600 hover:text-blue-800"
                onClick={() => onEdit(b)}
              >
                <Edit size={18} />
              </button>

              <button
                className="text-red-600 hover:text-red-800"
                onClick={() => onDelete(b.id)}
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        );
      })}

      {previewMedia && (
        <MediaPreviewModal
          media={previewMedia}
          onClose={() => setPreviewMedia(null)}
        />
      )}
    </div>
  );
}


/* ************************ BLOGS ************************ */

function BlogsTab({ data, onEdit, onDelete }) {
  if (!data.length)
    return <p className="text-gray-500">No banners added yet.</p>;

  const blogs = [
    {
      title: "Best Practices for Organic Farming",
      views: 1234,
      date: "2025-11-20",
    },
    { title: "Market Trends 2025", views: 1234, date: "2025-11-20" },
    { title: "Water Conservation Techniques", views: 1234, date: "2025-11-20" },
  ];

  return (
    <div>
      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {data.map((b, i) => (
          <div key={i} className="bg-white p-4 shadow rounded-lg">
            <p className="font-semibold">{b.title}</p>
            <p className="text-sm text-gray-500">Admin • {b.date}</p>
            <p className="text-sm text-gray-500">{b.views} views</p>

            <span className="text-xs px-2 py-1 bg-green-100 text-green-600 rounded inline-block mt-1">
              Published
            </span>

            <div className="flex justify-end gap-3 mt-2">
              <Edit
                size={18}
                className="text-blue-600"
                onClick={() => onEdit(b)}
              />
              <Trash2
                size={18}
                className="text-red-600"
                onClick={() => onDelete(b.id)}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white border border-gray-300 shadow rounded-lg overflow-x-auto">
        <table className="w-full text-left min-w-max">
          <thead className="bg-gray-100 border-b border-gray-200 text-gray-600 text-sm">
            <tr>
              <th className="p-3">Title</th>
              <th className="p-3">Author</th>
              <th className="p-3">Date</th>
              <th className="p-3">Views</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((b, i) => (
              <tr key={i} className="border-b border-gray-300">
                <td className="p-3">{b.title}</td>
                <td className="p-3">Admin</td>
                <td className="p-3">{b.date}</td>
                <td className="p-3">{b.views}</td>
                <td className="p-3">
                  <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded">
                    Published
                  </span>
                </td>
                <td className="p-3 flex justify-end gap-3">
                  <Edit
                    size={18}
                    className="text-blue-600"
                    onClick={() => onEdit(b)}
                  />
                  <Trash2
                    size={18}
                    className="text-red-600"
                    onClick={() => onDelete(b.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ************************ MEDIA ************************ */

// function MediaTab({data}) {
//   if (!data.length)
//     return <p className="text-gray-500">No banners added yet.</p>;

//   // const items = [
//   //   { title: "Farmer Success Story", views: 5678, date: "2025-11-18" },
//   //   { title: "Product Showcase", views: 3456, date: "2025-11-18" },
//   //   { title: "Farmer Success Story", views: 5678, date: "2025-11-18" },
//   // ];

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//       {data.map((m, i) => (
//         <div
//           key={i}
//           className="bg-white border border-gray-300 shadow rounded-lg p-3 flex flex-col"
//         >
//           <div className="bg-gray-200 h-40 sm:h-32 md:h-36 rounded mb-3"></div>
//           <p className="font-medium">{m.title}</p>
//           <p className="text-sm text-gray-500">{m.views} views</p>
//           <p className="text-sm text-gray-500 mb-3">{m.date}</p>

//           <div className="flex justify-between">
//             <button className="px-4 py-1 border border-gray-300 rounded text-gray-600">
//               Edit
//             </button>
//             <button className="px-4 py-1 bg-red-100 text-red-600 rounded">
//               Delete
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

function MediaTab({ data, onEdit, onDelete }) {
  const [previewMedia, setPreviewMedia] = useState(null);

  if (!data.length) {
    return <p className="text-gray-500">No media added yet.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {data.map((m) => (
        <div
          key={m.id}
          className="bg-white border border-gray-300 shadow rounded-lg p-3 flex flex-col"
        >
          {/* 🔹 MEDIA PREVIEW */}
          <div className="mb-3" onClick={() => setPreviewMedia(m)}>
            {m.mediaType === "Image" ? (
              <img
                src={m.preview}
                alt={m.title}
                className="h-40 sm:h-32 md:h-36 w-full object-cover rounded"
              />
            ) : (
              <video
                src={m.preview}
                controls
                className="h-40 sm:h-32 md:h-36 w-full object-cover rounded"
              />
            )}
          </div>

          <p className="font-medium">{m.title}</p>

          {/* Optional meta */}
          <p className="text-sm text-gray-500">{m.mediaType}</p>

          <div className="flex justify-between mt-auto pt-3">
            <button
              onClick={() => onEdit?.(m)}
              className="px-4 py-1 border border-gray-300 rounded text-gray-600 hover:bg-gray-100"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete?.(m.id)}
              className="px-4 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      {previewMedia && (
        <MediaPreviewModal
          media={previewMedia}
          onClose={() => setPreviewMedia(null)}
        />
      )}
    </div>
  );
}

/* ************************ PAGES ************************ */

function PagesTab({ data, onEdit, onDelete }) {
  if (!data.length)
    return <p className="text-gray-500">No banners added yet.</p>;

  // const pages = [
  //   { title: "About Us", sub: "Company information and mission" },
  //   { title: "Services", sub: "Our services and offerings" },
  //   { title: "Contact", sub: "Contact information and form" },
  //   { title: "Footer & Header", sub: "Edit navigation links and social media" },
  // ];

  return (
    <div className="space-y-3">
      {data.map((p, i) => (
        <div
          key={i}
          className="bg-white border border-gray-300 shadow rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-3"
        >
          <div>
            <p className="font-medium">{p.title}</p>
            <p className="text-sm text-gray-500">{p.sub}</p>
          </div>

          <div className="flex gap-3 w-full md:w-auto md:justify-end">
            {p.title === "Footer & Header" ? (
              <button className="px-3 py-1 border border-gray-300 rounded text-gray-700">
                Edit Links
              </button>
            ) : (
              <>
                <button
                  className="px-3 py-1 border border-gray-300 rounded text-gray-700"
                  onClick={() => onEdit(P)}
                >
                  Edit Content
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded text-gray-700">
                  Preview
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
