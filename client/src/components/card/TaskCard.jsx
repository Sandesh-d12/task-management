// import { getInitials } from "../../utils";

export const Card = ({ title, id, name, type, priority, time }) => {
  function getInitials(text) {
    console.log(text);
    const input = text?.toString();
    const firstLetter = input?.trim()[0]?.toUpperCase();
    console.log(firstLetter);
    return firstLetter;
  }
  //   getInitials("admin")
  return (
    <div class="max-w-xs p-4 bg-white rounded-lg shadow-md border border-gray-200">
      <div class="flex items-center space-x-2 mb-2">
        <span class="text-gray-700 font-medium text-sm">{id}</span>
        <span class="text-gray-800 font-semibold text-md">{title}</span>
      </div>

      <div class="flex items-center space-x-2 mt-3">
        <div class="flex items-center justify-center w-8 h-8 bg-blue-200 rounded-full text-xs text-white font-bold">
          {getInitials(name)}
        </div>

        <div class="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full text-xs text-green-700 font-bold">
          {getInitials(type)}
        </div>

        <div class="flex items-center justify-center w-8 h-8 bg-blue-700 rounded-full text-xs text-white font-bold">
          {getInitials(priority)}
        </div>

        <span class="text-gray-500 text-sm">{time}</span>
      </div>
    </div>
  );
};
