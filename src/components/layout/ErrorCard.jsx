export default function ErrorCard({ message }) {
  return (
    <div className="w-full rounded-2xl bg-red-50 border border-red-200 p-5 sm:p-6 text-center">
      <div className="text-3xl sm:text-4xl mb-2">⚠️</div>
      <p className="font-bold text-red-600 text-sm sm:text-base">
        {message || "Something went wrong"}
      </p>
      <p className="text-xs sm:text-sm text-red-400 mt-1">
        Please try again or search for another city.
      </p>
    </div>
  );
}
