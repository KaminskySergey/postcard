import { cn } from "@/utils/utils";

interface IProgressBar {
  current: number; 
  total: number;  
  className?: string;
}

export default function ProgressBar({ current, total, className }: IProgressBar) {
  const progress = ((current + 1) / total) * 100;

  return (
    <div className={cn("w-full space-y-2", className)}>
      <div className="flex justify-between text-[10px] uppercase tracking-widest text-white/30 font-bold px-1">
        <span>Frage {current + 1}</span>
        <span>{Math.round(progress)}%</span>
      </div>

      <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden border border-white/5">
        <div
          className="bg-green-500 h-full transition-all duration-500 ease-out shadow-[0_0_15px_rgba(99, 241, 101, 0.4)]"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}