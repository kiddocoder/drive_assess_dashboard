import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ImageIcon, PlusCircle, Video } from "lucide-react";
import { useFetchCategories } from "../../hooks/apiFeatures/useCategories"
import { useCreateQuestion } from "../../hooks/apiFeatures/useQuestions"

interface Category {
    id: string
    _id: string
    name: string
    description: string
    icon: string
    color: string
    testsCount: number
    questionsCount: number
    studentsEnrolled: number
    averageScore: number
    status: "active" | "inactive"
    createdAt: string
    isActive: boolean
}


interface QuestionFormProps {
    question?: any;
    isOpened: boolean;
    onClose: () => void;
}

function QuestionForm({ question, isOpened, onClose }: QuestionFormProps) {
    const { data: categories = [] } = useFetchCategories()
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [currentOption, setCurrentOption] = useState("");
    const [isAddingOption, setIsAddingOption] = useState(false);
    const [formData, setFormData] = useState({
        options: [] as string[],
        question: "",
        category: "",
        difficulty: "easy",
        explanation: "",
        points: 1,
        correctAnswer: 1
    });

    const createQuestionMutation = useCreateQuestion()

    const addOrUpdateOption = () => {
        if (!currentOption.trim()) return;

        if (editingIndex !== null) {
            // Updating an existing option
            setFormData((prev) => {
                const updatedOptions = [...prev.options];
                updatedOptions[editingIndex] = currentOption;
                return { ...prev, options: updatedOptions };
            });
            setEditingIndex(null);
        } else {
            // Adding a new option
            setFormData((prev) => ({
                ...prev,
                options: [...prev.options, currentOption],
            }));
        }
        setCurrentOption("");
        setIsAddingOption(false);
    };

    const handleOptionEdit = (index: number) => {
        setCurrentOption(formData.options[index]);
        setEditingIndex(index);
        setIsAddingOption(true);
    };

    const handleOptionDelete = (index: number) => {
        setFormData((prev) => {
            const updatedOptions = [...prev.options];
            updatedOptions.splice(index, 1);
            return { ...prev, options: updatedOptions };
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission here
        await createQuestionMutation.mutateAsync(formData, {
            onSuccess: () => onClose()
        })
    };

    const handleCorrectAnswerChange = (index: number) => {
        setFormData(prev => ({
            ...prev,
            correctAnswer: index
        }));
    };

    return (
        <AnimatePresence>
            {isOpened && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-start justify-center z-50 p-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[95vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3 className="text-2xl font-bold text-charcoal mb-6">
                            {question ? "Edit Question" : "Create New Question"}
                        </h3>

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-charcoal mb-2">Category</label>
                                    <select
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coolBlue focus:border-transparent"
                                        value={formData.category}
                                        onChange={(e) =>
                                            setFormData({ ...formData, category: e.target.value })
                                        }
                                    >
                                        <option value="" selected disabled>--- Select category ---</option>
                                        {categories.data.map((category: Category) => (
                                            <option key={category._id} value={category._id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-charcoal mb-2">Difficulty</label>
                                    <select
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coolBlue focus:border-transparent"
                                        value={formData.difficulty}
                                        onChange={(e) =>
                                            setFormData({ ...formData, difficulty: e.target.value })
                                        }
                                    >
                                        <option value="easy">Easy</option>
                                        <option value="normal">Normal</option>
                                        <option value="hard">Hard</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-charcoal mb-2">Question Text</label>
                                <textarea
                                    rows={3}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coolBlue focus:border-transparent"
                                    placeholder="Enter your question here..."
                                    value={formData.question}
                                    onChange={(e) =>
                                        setFormData({ ...formData, question: e.target.value })
                                    }
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-charcoal mb-2">
                                    Answer Options
                                </label>
                                <div className="space-y-3">
                                    {formData.options.map((option, index) => (
                                        <div key={index} className="flex items-center space-x-3">
                                            <input
                                                type="radio"
                                                name="correct-answer"
                                                className="w-4 h-4 text-coolBlue"
                                                onChange={() => handleCorrectAnswerChange(index)}
                                            />
                                            <input
                                                type="text"
                                                value={option}
                                                onChange={(e) => {
                                                    const updatedOptions = [...formData.options];
                                                    updatedOptions[index] = e.target.value;
                                                    setFormData({ ...formData, options: updatedOptions });
                                                }}
                                                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coolBlue focus:border-transparent"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => handleOptionEdit(index)}
                                                className="text-coolBlue hover:text-blue-700"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleOptionDelete(index)}
                                                className="text-canadianRed hover:text-red-700"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    ))}

                                    <div className="flex items-center space-x-3">
                                        <input
                                            type="text"
                                            value={currentOption}
                                            onChange={(e) => setCurrentOption(e.target.value)}
                                            placeholder="Add new option"
                                            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coolBlue focus:border-transparent"
                                            onKeyDown={(e) => e.key === "Enter" && addOrUpdateOption()}
                                        />
                                        <button
                                            type="button"
                                            onClick={addOrUpdateOption}
                                            disabled={!currentOption.trim()}
                                            className={`p-2 rounded-md text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${editingIndex !== null
                                                ? "bg-green-500 hover:bg-green-600 focus:ring-green-500"
                                                : "bg-blue-500 hover:bg-blue-600 focus:ring-blue-500"
                                                } ${isAddingOption ? "opacity-50 cursor-not-allowed" : ""}`}
                                        >
                                            {editingIndex !== null ? <Check size={18} /> : <PlusCircle size={18} />}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-charcoal mb-2">
                                    Explanation
                                </label>
                                <textarea
                                    rows={3}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coolBlue focus:border-transparent"
                                    placeholder="Explain why this is the correct answer..."
                                    value={formData.explanation}
                                    onChange={(e) =>
                                        setFormData({ ...formData, explanation: e.target.value })
                                    }
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-charcoal mb-2">
                                        Question Image (Optional)
                                    </label>
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50">
                                        <ImageIcon className="w-8 h-8 text-grayText mx-auto mb-2" />
                                        <p className="text-sm text-grayText">Click to upload image</p>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-charcoal mb-2">
                                        Explanation Video (Optional)
                                    </label>
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50">
                                        <Video className="w-8 h-8 text-grayText mx-auto mb-2" />
                                        <p className="text-sm text-grayText">Click to upload video</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-6 py-3 border border-gray-300 text-charcoal rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-3 bg-canadianRed text-white rounded-lg hover:bg-canadianRed/90 transition-colors"
                                >
                                    {question ? "Update Question" : "Create Question"}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default QuestionForm;