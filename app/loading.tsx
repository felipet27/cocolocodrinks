export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="text-center">
        <div className="mb-4 mx-auto h-10 w-10 animate-pulse rounded-full border-2 border-[#39FF14]/60" />
        <p className="text-sm text-white/50">Cargando...</p>
      </div>
    </div>
  );
}
