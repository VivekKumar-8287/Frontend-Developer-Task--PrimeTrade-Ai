export default function UserProfileCard({ user }) {
  if (!user) return null;

  return (
    <div className="flex justify-center">
      <div className="max-w-sm w-full bg-white shadow-lg rounded-2xl p-6 text-center ">
        
        <div className="w-24 h-24 mx-auto rounded-full bg-purple-200 flex items-center justify-center text-4xl font-bold text-purple-700">
          {user.name.charAt(0).toUpperCase()}
        </div>

        <h2 className="text-xl font-semibold mt-4 capitalize">
          {user.name}
        </h2>

        <p className="text-gray-500 text-md mt-1">{user.email}</p>

        
      </div>
    </div>
  );
}
