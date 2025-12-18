import { useState, useRef } from "react";
import {
  Search,
  Filter,
  MessageSquare,
  User,
  Clock,
  CheckCircle,
  AlertCircle,
  Paperclip,
  Send,
} from "lucide-react";

const ticketsData = [
  {
    id: 1,
    ticketId: "#TKT-1234",
    user: "Rajesh Kumar",
    userType: "Farmer",
    category: "Payment Issue",
    subject: "Payment not received for order",
    status: "open",
    priority: "high",
    date: "2024-11-26",
    replies: 3,
  },
  {
    id: 2,
    ticketId: "#TKT-1235",
    user: "Amit Shah",
    userType: "Seller",
    category: "Product Listing",
    subject: "Unable to upload product images",
    status: "in-progress",
    priority: "medium",
    date: "2024-11-25",
    replies: 5,
  },
  {
    id: 3,
    ticketId: "#TKT-1236",
    user: "Anita Desai",
    userType: "Buyer",
    category: "Order Issue",
    subject: "Wrong product delivered",
    status: "resolved",
    priority: "high",
    date: "2024-11-24",
    replies: 8,
  },
  {
    id: 4,
    ticketId: "#TKT-1237",
    user: "Suresh Patel",
    userType: "Farmer",
    category: "Technical",
    subject: "App crashing on login",
    status: "open",
    priority: "urgent",
    date: "2024-11-26",
    replies: 1,
  },
  {
    id: 5,
    ticketId: "#TKT-1238",
    user: "Kavita Iyer",
    userType: "Buyer",
    category: "Account",
    subject: "Cannot change profile picture",
    status: "in-progress",
    priority: "low",
    date: "2024-11-23",
    replies: 2,
  },
];

const statusConfig = {
  open: { color: "bg-blue-100 text-blue-800", icon: AlertCircle },
  "in-progress": { color: "bg-yellow-100 text-yellow-800", icon: Clock },
  resolved: { color: "bg-green-100 text-green-800", icon: CheckCircle },
  closed: { color: "bg-gray-100 text-gray-800", icon: CheckCircle },
};

const priorityColors = {
  urgent: "bg-red-100 text-red-800",
  high: "bg-orange-100 text-orange-800",
  medium: "bg-yellow-100 text-yellow-800",
  low: "bg-gray-100 text-gray-800",
};

export default function Tickets() {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [replyText, setReplyText] = useState("");
  const [statusAction, setStatusAction] = useState("Keep Open");

  /* 🔹 Attach file states (ADDED) */
  const [attachedFile, setAttachedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleAttachClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAttachedFile(file);

    }
  };

  const handleSendReply = () => {
    if (!replyText.trim()) {
      alert("Please type a reply");
      return;
    }

    console.log("Reply sent:", replyText);
    console.log("Action:", statusAction);


    setReplyText("");
    setAttachedFile(null);
    alert("Reply sent successfully");
  };

  const handleStatusChange = (action) => {
    let newStatus = selectedTicket.status;

    if (action === "Mark In Progress") newStatus = "in-progress";
    if (action === "Mark Resolved") newStatus = "resolved";
    if (action === "Close Ticket") newStatus = "closed";

    setSelectedTicket({ ...selectedTicket, status: newStatus });
  };

  const handleAssignStaff = () => {
    alert("Ticket assigned to support staff");
  };

  const filteredTickets = ticketsData.filter((ticket) => {
    const matchStatus =
      filterStatus === "all" || ticket.status === filterStatus;

    const matchSearch =
      ticket.ticketId.toLowerCase().includes(searchText.toLowerCase()) ||
      ticket.user.toLowerCase().includes(searchText.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(searchText.toLowerCase()) ||
      ticket.category.toLowerCase().includes(searchText.toLowerCase());

    return matchStatus && matchSearch;
  });

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Title */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold">Support & Tickets</h2>
          <p className="text-gray-600">Manage customer support tickets</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {[
          {
            label: "All Tickets",
            val: 156,
            status: "all",
            color: "text-gray-600",
          },
          { label: "Open", val: 45, status: "open", color: "text-blue-600" },
          {
            label: "In Progress",
            val: 67,
            status: "in-progress",
            color: "text-yellow-600",
          },
          {
            label: "Resolved",
            val: 38,
            status: "resolved",
            color: "text-green-600",
          },
          { label: "Closed", val: 6, status: "closed", color: "text-gray-600" },
        ].map((item) => (
          <div
            key={item.status}
            onClick={() => setFilterStatus(item.status)}
            className={`bg-white rounded-lg p-4 shadow-sm border-2 cursor-pointer text-center transition-all ${filterStatus === item.status
              ? "border-green-500"
              : "border-gray-200"
              }`}
          >
            <p className="text-gray-600 text-sm">{item.label}</p>
            <p className={`mt-1 font-semibold ${item.color}`}>{item.val}</p>
          </div>
        ))}
      </div>

      {/* Search / Filter */}
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
        <div className="flex flex-wrap gap-3">
          <div className="flex-1 relative min-w-[180px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search tickets..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />

          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
        <table className="w-full text-sm table-fixed">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 w-24 text-left text-gray-600">
                Ticket ID
              </th>
              <th className="px-4 py-3 w-40 text-left text-gray-600">User</th>
              <th className="px-4 py-3 w-32 text-left text-gray-600">
                Category
              </th>
              <th className="px-4 py-3 w-64 text-left text-gray-600">
                Subject
              </th>
              <th className="px-4 py-3 w-24 text-left text-gray-600">
                Priority
              </th>
              <th className="px-4 py-3 w-28 text-left text-gray-600">Status</th>
              <th className="px-4 py-3 w-20 text-left text-gray-600">
                Replies
              </th>
              <th className="px-4 py-3 w-28 text-left text-gray-600">Date</th>
              <th className="px-4 py-3 w-24 text-left text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredTickets.map((ticket) => {

              const StatusIcon = statusConfig[ticket.status].icon;
              return (
                <tr key={ticket.id} className="hover:bg-gray-50 border-b border-gray-200">
                  <td className="px-4 py-2 truncate">{ticket.ticketId}</td>
                  <td className="px-4 py-2 truncate">
                    <p className="truncate">{ticket.user}</p>
                    <p className="text-xs text-gray-500">{ticket.userType}</p>
                  </td>
                  <td className="px-4 py-2 truncate">{ticket.category}</td>
                  <td className="px-4 py-2 truncate">{ticket.subject}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${priorityColors[ticket.priority]
                        }`}
                    >
                      {ticket.priority}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <span
                      className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 w-fit ${statusConfig[ticket.status].color
                        }`}
                    >
                      <StatusIcon className="w-3 h-3" />
                      {ticket.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 flex items-center gap-1">
                    <MessageSquare className="w-4 h-4" /> {ticket.replies}
                  </td>
                  <td className="px-4 py-2 text-gray-600">{ticket.date}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => setSelectedTicket(ticket)}
                      className="px-3 py-1 bg-[green] text-white rounded text-xs hover:bg-green-600"
                    >
                      View
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {filteredTickets.map((ticket) => {

          const StatusIcon = statusConfig[ticket.status].icon;
          return (
            <div
              key={ticket.id}
              className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 space-y-2"
            >
              <div className="flex justify-between items-center">
                <p className="font-semibold">{ticket.ticketId}</p>
                <button
                  onClick={() => setSelectedTicket(ticket)}
                  className="px-2 py-1 bg-[green] text-white rounded text-xs hover:bg-green-600"
                >
                  View
                </button>
              </div>
              <p className="text-sm">{ticket.subject}</p>
              <p className="text-xs text-gray-500">
                {ticket.user} ({ticket.userType})
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                <span
                  className={`text-xs px-2 py-1 rounded-full ${priorityColors[ticket.priority]
                    }`}
                >
                  {ticket.priority}
                </span>
                <span
                  className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${statusConfig[ticket.status].color
                    }`}
                >
                  <StatusIcon className="w-3 h-3" />
                  {ticket.status}
                </span>
                <span className="text-xs flex items-center gap-1 text-gray-500">
                  <MessageSquare className="w-3 h-3" /> {ticket.replies}
                </span>
                <span className="text-xs text-gray-500">{ticket.date}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto p-4 sm:p-6">
            {/* Modal Header */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-lg">
                  {selectedTicket.ticketId} - {selectedTicket.subject}
                </h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${statusConfig[selectedTicket.status].color
                      }`}
                  >
                    {selectedTicket.status}
                  </span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${priorityColors[selectedTicket.priority]
                      }`}
                  >
                    {selectedTicket.priority} priority
                  </span>
                </div>
              </div>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setSelectedTicket(null)}
              >
                ✕
              </button>
            </div>

            {/* Ticket Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-gray-50 rounded border border-gray-300 mb-4">
              <div>
                <p className="text-xs text-gray-600">User</p>
                <p>
                  {selectedTicket.user} ({selectedTicket.userType})
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-600">Category</p>
                <p>{selectedTicket.category}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600">Created</p>
                <p>{selectedTicket.date}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600">Assigned To</p>
                <p>Support Team</p>
              </div>
            </div>

            {/* Conversation */}
            <div className="space-y-4 pb-4">
              <h4 className="font-semibold">Conversation</h4>
              {/* User Message */}
              <div className="flex gap-3 flex-wrap">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex justify-center items-center">
                  <User className="text-white" />
                </div>
                <div className="flex-1 min-w-[200px]">
                  <div className="bg-gray-100 p-3 sm:p-4 rounded-lg">
                    <div className="flex justify-between mb-2 text-sm">
                      <p>{selectedTicket.user}</p>
                      <span className="text-gray-500 text-xs">
                        {selectedTicket.date}
                      </span>
                    </div>
                    <p className="text-gray-700 text-sm">
                      I completed an order but haven't received the payment
                      yet...
                    </p>
                    <div className="flex gap-2 mt-3 text-xs text-gray-600">
                      <Paperclip className="w-4 h-4" /> payment_receipt.pdf
                    </div>
                  </div>
                </div>
              </div>
              {/* Admin Reply */}
              <div className="flex gap-3 flex-wrap">
                <div className="w-10 h-10 bg-green-500 rounded-full flex justify-center items-center">
                  <User className="text-white" />
                </div>
                <div className="flex-1 min-w-[200px]">
                  <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
                    <div className="flex justify-between mb-2 text-sm">
                      <p>Support Team</p>
                      <span className="text-gray-500 text-xs">2 hours ago</span>
                    </div>
                    <p className="text-gray-700 text-sm">
                      Our team is checking your payment and will update you
                      within 24-48 hours.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Reply Form */}
            <div className="border-t border-gray-300 pt-6 space-y-3 pb-4">
              <h4 className="font-semibold">Reply to Ticket</h4>

              <textarea
                rows={4}
                placeholder="Type your reply..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              <div className="flex flex-wrap justify-between gap-3">
                <button
                  onClick={handleAttachClick}
                  className="flex items-center gap-2 px-3 sm:px-4 py-2 border text-xs sm:text-sm rounded-lg hover:bg-gray-50"
                >
                  <Paperclip className="w-4 h-4" /> Attach File
                </button>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />

                <div className="flex gap-2 flex-wrap">
                  <select
                    value={statusAction}
                    onChange={(e) => setStatusAction(e.target.value)}
                    className="px-3 sm:px-4 py-2 border rounded-lg text-xs sm:text-sm"
                  >
                    <option>Keep Open</option>
                    <option>Mark In Progress</option>
                    <option>Mark Resolved</option>
                    <option>Close Ticket</option>
                  </select>

                  <button
                    onClick={handleSendReply}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg text-xs sm:text-sm hover:bg-blue-600"
                  >
                    <Send className="w-4 h-4" /> Send Reply
                  </button>
                </div>
              </div>

              {attachedFile && (
                <p className="text-xs text-gray-600">
                  Attached: {attachedFile.name}
                </p>
              )}
            </div>

            {/* Footer Actions */}
            <div className="border-t border-gray-300 pt-4 flex flex-wrap gap-3">
              <button
                onClick={handleAssignStaff}
                className="px-3 sm:px-4 py-2 border rounded-lg text-xs sm:text-sm hover:bg-gray-50"
              >
                Assign to Staff
              </button>

              <button
                onClick={() => handleStatusChange("Mark Resolved")}
                className="px-3 sm:px-4 py-2 bg-green-500 text-white rounded-lg text-xs sm:text-sm hover:bg-green-600"
              >
                Mark as Resolved
              </button>

              <button
                onClick={() => handleStatusChange("Close Ticket")}
                className="px-3 sm:px-4 py-2 bg-red-500 text-white rounded-lg text-xs sm:text-sm hover:bg-red-600"
              >
                Close Ticket
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );

}
