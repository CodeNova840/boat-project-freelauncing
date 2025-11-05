import { Eye, EyeOff } from "lucide-react";
import {useToggle} from '../../hooks/useToggle'
export default function InputField({
  label,
  type = "text",
  placeholder = "",
  value,
  onChange,
  showToggle = false,
}) {
  const [visible, toggleVisible] = useToggle(false);
  const inputType = showToggle && visible ? "text" : type;

  return (
    <div className="relative w-full">
      {label && (
        <label className="block text-gray-700 dark:text-gray-300 text-sm mb-1">
          {label}
        </label>
      )}

      <input
        type={inputType}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:border-indigo-500 text-gray-900 dark:text-gray-100 ${
          showToggle ? "pr-10" : ""
        }`}
      />

      {showToggle && (
        <button
          type="button"
          onClick={toggleVisible}
          className="absolute right-3 top-9 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none"
          aria-label="Toggle input visibility"
        >
          {visible ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      )}
    </div>
  );
}