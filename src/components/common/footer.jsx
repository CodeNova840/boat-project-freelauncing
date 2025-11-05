
export default function Footer() {
  return (
    <footer className="w-full bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-300 text-center py-4 mt-auto border-t border-gray-200 dark:border-gray-700">
      <p className="text-sm">
        © {new Date().getFullYear()} My Company. All rights reserved.
      </p>
      {/* <p className="text-xs">
        Prices include 10% GST. | <a href="#" className="hover:underline">Privacy Policy</a>
      </p> */}
    </footer>
  );
}
