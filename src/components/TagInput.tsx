'use client';

import React, { useState, KeyboardEvent } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TagInputProps {
    tags: string[];
    onTagsChange: (tags: string[]) => void;
    maxTags?: number;
    placeholder?: string;
}

export const TagInput: React.FC<TagInputProps> = ({
    tags,
    onTagsChange,
    maxTags = 3,
    placeholder = "Add tags..."
}) => {
    const [inputValue, setInputValue] = useState('');

    const addTag = () => {
        const trimmedValue = inputValue.trim().toLowerCase().replace(/^#/, '');
        if (trimmedValue && !tags.includes(trimmedValue) && tags.length < maxTags) {
            onTagsChange([...tags, trimmedValue]);
            setInputValue('');
        }
    };

    const removeTag = (tagToRemove: string) => {
        onTagsChange(tags.filter(tag => tag !== tagToRemove));
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addTag();
        } else if (e.key === ',' || e.key === ' ') {
            e.preventDefault();
            addTag();
        } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
            removeTag(tags[tags.length - 1]);
        }
    };

    return (
        <div className="w-full">
            <div className="flex flex-wrap gap-2 p-3 bg-white border border-gray-200 rounded-[24px] focus-within:ring-2 focus-within:ring-metamask-orange/50 pill-shadow transition-all min-h-[56px] items-center">
                <AnimatePresence>
                    {tags.map((tag) => (
                        <motion.span
                            key={tag}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="flex items-center gap-1.5 px-3 py-1 bg-metamask-purple text-white rounded-full text-sm font-bold shadow-sm"
                        >
                            #{tag}
                            <button
                                type="button"
                                onClick={() => removeTag(tag)}
                                className="hover:text-metamask-orange transition-colors"
                            >
                                <X size={14} />
                            </button>
                        </motion.span>
                    ))}
                </AnimatePresence>

                {tags.length < maxTags && (
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={tags.length === 0 ? placeholder : ""}
                        className="flex-1 bg-transparent border-none outline-none text-metamask-purple placeholder:text-metamask-purple/30 min-w-[120px] px-2"
                    />
                )}
            </div>
            <div className="flex justify-between mt-2 px-4">
                <p className="text-[10px] text-metamask-purple/30 italic">
                    Press Enter, Comma, or Space to add.
                </p>
                <p className="text-[10px] text-metamask-purple/30 font-bold">
                    {tags.length}/{maxTags}
                </p>
            </div>
        </div>
    );
};
