export default function AppError({ message }: { message: string }) {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-2 rounded-2xl border border-destructive/40 bg-destructive/5 p-10 text-center">
      <span className="text-2xl">⚠️</span>
      <p className="text-sm font-medium text-destructive">{message}</p>
    </div>
  );
}