const BASE_URL = import.meta.env.VITE_API_URL;


const TestCard = ({ id, title, description, createdAt, onDelete }) => {
  const handleDelete = async () => {
    const confirm = window.confirm("Are you sure you want to delete this test?");
    if (!confirm) return;

    try {
      const response = await fetch(`${BASE_URL}/userApp/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const result = await response.json();

      if (response.ok) {
        alert("Test deleted successfully");
        onDelete(id); // remove from UI
      } else {
        alert(result.message || "Failed to delete test");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4">
      <h4 className="text-lg font-semibold mb-2">{title}</h4>
      <p className="text-sm text-gray-600 mb-2">
        Created: {new Date(createdAt).toLocaleDateString()}
      </p>
      <p className="text-gray-800">{description}</p>
      <button
        className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md"
        onClick={handleDelete}
      >
        Delete Test
      </button>
    </div>
  );
};

export default TestCard;
