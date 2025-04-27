import React from 'react';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: { name: string; id: string };
  onSave: (updatedProfile: { name: string; id: string }) => void;
  onImageUpload: (image: string) => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSave,
  onImageUpload,
}) => {
  const [name, setName] = React.useState(profile.name);
  const [id, setId] = React.useState(profile.id);
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const image = reader.result as string;
        setImagePreview(image);
        onImageUpload(image); // Pass the new image to the parent
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name, id }); // Pass the updated profile data to the parent
    onClose(); // Close the modal
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">ID</label>
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="ID"
            />
          </div>
          {/* <div>
            <label className="block text-sm font-medium text-gray-700">Profile Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
            {imagePreview && (
              <div className="mt-2">
                <img
                  src={imagePreview}
                  alt="Profile Preview"
                  className="w-16 h-16 rounded-full object-cover"
                />
              </div>
            )}
          </div> */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#A19158] text-white px-4 py-2 rounded-lg hover:bg-[#8a7c4d] transition-all"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;