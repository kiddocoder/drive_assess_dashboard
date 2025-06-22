import type React from "react";
import { Search, X } from "lucide-react";
import Modal from "../ui/Modal";
import { useState, useEffect, useRef } from "react";

interface SearchResult {
    id: string;
    title: string;
    type: 'quiz' | 'article' | 'category';
}

const SearchPopup: React.FC<{ isOpened: boolean; onClose: () => void }> = ({ isOpened, onClose }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    // Sample search results - replace with your actual search logic
    const sampleResults: SearchResult[] = [
        { id: '1', title: 'Road Signs Basic Quiz', type: 'quiz' },
        { id: '2', title: 'Traffic Rules Advanced', type: 'quiz' },
        { id: '3', title: 'Parking Regulations in Canada', type: 'article' },
        { id: '4', title: 'Winter Driving Tips', type: 'article' },
        { id: '5', title: 'Road Signs', type: 'category' },
    ];

    useEffect(() => {
        if (isOpened && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpened]);

    useEffect(() => {
        if (!isOpened) {
            setSearchQuery("");
            setResults([]);
        }
    }, [isOpened]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query.length < 2) {
            setResults([]);
            return;
        }

        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            const filtered = sampleResults.filter(item =>
                item.title.toLowerCase().includes(query.toLowerCase())
            );
            setResults(filtered);
            setIsLoading(false);
        }, 300);
    };

    const handleClear = () => {
        setSearchQuery("");
        setResults([]);
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const handleResultClick = (result: SearchResult) => {
        console.log("Selected result:", result);
        // Navigate to the selected item
        onClose();
    };

    if (!isOpened) {
        return null;
    }

    return (
        <Modal onClose={onClose} title="Search for everything" className="flex items-start justify-center !z-[999]">
            <div className="relative pt-6">
                <div className="relative flex items-center">
                    <Search className="absolute left-3 text-gray-400" size={20} />
                    <input
                        ref={inputRef}
                        type="text"
                        value={searchQuery}
                        onChange={handleSearch}
                        placeholder="Search quizzes, articles, categories..."
                        className="w-full pl-10 pr-10 py-3 border-1 focus:ring-1 outline-none border-gray-200 focus:ring-blue-500 rounded-lg"
                    />
                    {searchQuery && (
                        <button
                            onClick={handleClear}
                            className="absolute right-3 text-gray-400 hover:text-gray-600"
                        >
                            <X size={20} />
                        </button>
                    )}
                </div>

                {(isLoading || results.length > 0) && (
                    <div className="mt-2 max-h-96 overflow-y-auto border rounded-lg shadow-lg">
                        {isLoading ? (
                            <div className="p-4 text-center text-gray-500">Searching...</div>
                        ) : (
                            <ul>
                                {results.map((result) => (
                                    <li
                                        key={result.id}
                                        className="p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                                        onClick={() => handleResultClick(result)}
                                    >
                                        <div className="flex items-center">
                                            <div className={`w-2 h-2 rounded-full mr-2 ${result.type === 'quiz' ? 'bg-blue-500' :
                                                result.type === 'article' ? 'bg-green-500' : 'bg-purple-500'
                                                }`} />
                                            <div>
                                                <p className="font-medium">{result.title}</p>
                                                <p className="text-xs text-gray-500 capitalize">{result.type}</p>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}

                {searchQuery.length >= 2 && !isLoading && results.length === 0 && (
                    <div className="mt-2 p-4 text-center text-gray-500 border border-gray-200 rounded-lg">
                        No results found for "{searchQuery}"
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default SearchPopup;