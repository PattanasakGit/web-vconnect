"use client";

import React, { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";

interface SelectCustomProps {
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  placeholder?: string;
  enableSearch?: boolean;
  defaultValue?: string;
  [key: string]: unknown;
}

const SelectComponent: React.FC<SelectCustomProps> = ({
  options,
  onChange,
  placeholder = "Please Select",
  enableSearch = false,
  defaultValue,
  ...props
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    defaultValue
  );

  useEffect(() => {
    if (defaultValue) {
      setSelectedValue(defaultValue);
    }
  }, [defaultValue]);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleValueChange = (value: string) => {
    setSelectedValue(value);
    onChange(value);
  };

  return (
    <Select onValueChange={handleValueChange} value={selectedValue} {...props}>
      <SelectTrigger className="w-full truncate border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300">
        <SelectValue>
          {selectedValue
            ? options.find((option) => option.value === selectedValue)?.label
            : placeholder}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {enableSearch && (
          <div className="p-2">
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300"
            />
          </div>
        )}
        {filteredOptions.length > 0 ? (
          filteredOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))
        ) : (
          <div className="p-2 text-gray-500 text-sm">No options found</div>
        )}
      </SelectContent>
    </Select>
  );
};

export default SelectComponent;
