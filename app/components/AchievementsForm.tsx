"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Achievement } from "@/app/types/Achievements";
import useAchievements from "@/hooks/useAchievements";
import { toast, Toaster } from "sonner";

type AchievementsFormProps = {
  initialData?: Achievement;
  triggerLabel?: string;
};

export default function AchievementsForm({
  initialData,
  triggerLabel = "Create New",
}: AchievementsFormProps) {
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState<Achievement>({
    project: initialData?.project || "",
    sector: initialData?.sector || "",
    district: initialData?.district || "",
    province: initialData?.province || "",
    tenure: initialData?.tenure || "",
    budget: initialData?.budget || 0,
    image: initialData?.image || null,
  });

  const { addAchievement } = useAchievements();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "image" && files && files.length > 0
          ? files[0]
          : name === "budget"
          ? parseFloat(value) || 0
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic type check for image (File | null)
    if (formData.image && !(formData.image instanceof File)) {
      alert("Invalid image file");
      return;
    }
    setOpen(false);
    await addAchievement(formData);
    toast.success("Achievement added successfully");
    setFormData({
      project: "",
      sector: "",
      district: "",
      province: "",
      tenure: "",
      budget: 0,
      image: null,
    })
  };

  return (
    <>
      <Toaster />
      <button
        onClick={() => setOpen(true)}
        className="bg-primary px-4 py-2 text-white rounded-lg hover:bg-blue-700 transition"
      >
        {initialData ? "Edit Achievement" : triggerLabel}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-900 w-full max-w-xl mx-4 rounded-xl p-6 shadow-lg"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {initialData ? "Edit Achievement" : "Add New Achievement"}
                </h2>
                <button
                  onClick={() => setOpen(false)}
                  className="text-gray-500 hover:text-red-500 text-lg font-bold"
                >
                  &times;
                </button>
              </div>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="project"
                  value={formData.project}
                  onChange={handleChange}
                  placeholder="Project"
                  className="w-full px-4 py-2 rounded bg-gray-100 dark:bg-gray-800"
                  required
                />

                <input
                  type="text"
                  name="sector"
                  value={formData.sector}
                  onChange={handleChange}
                  placeholder="Sector"
                  className="w-full px-4 py-2 rounded bg-gray-100 dark:bg-gray-800"
                  required
                />

                <input
                  type="text"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  placeholder="District"
                  className="w-full px-4 py-2 rounded bg-gray-100 dark:bg-gray-800"
                  required
                />

                <input
                  type="text"
                  name="province"
                  value={formData.province}
                  onChange={handleChange}
                  placeholder="Province"
                  className="w-full px-4 py-2 rounded bg-gray-100 dark:bg-gray-800"
                  required
                />

                <input
                  type="text"
                  name="tenure"
                  value={formData.tenure}
                  onChange={handleChange}
                  placeholder="Tenure"
                  className="w-full px-4 py-2 rounded bg-gray-100 dark:bg-gray-800"
                  required
                />

                <input
                  type="number"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  placeholder="Budget"
                  className="w-full px-4 py-2 rounded bg-gray-100 dark:bg-gray-800"
                  required
                />

                <input
                  type="file"
                  name="image"
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded bg-gray-100 dark:bg-gray-800"
                  accept="image/*"
                />

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                  {initialData ? "Update" : "Add"}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
