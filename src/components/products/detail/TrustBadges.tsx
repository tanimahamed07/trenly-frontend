import { Shield, Truck, RefreshCw } from "lucide-react";

const Badge = ({
  icon: Icon,
  title,
  sub,
}: {
  icon: any;
  title: string;
  sub: string;
}) => (
  <div className="flex items-center gap-3 p-4 rounded-2xl bg-base-200/60 border border-base-300/60">
    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
      <Icon size={18} />
    </div>
    <div>
      <p className="text-xs font-black text-secondary">{title}</p>
      <p className="text-[10px] text-neutral/40 font-medium">{sub}</p>
    </div>
  </div>
);

export const TrustBadges = () => (
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
    <Badge icon={Truck} title="Free Shipping" sub="Orders over $50" />
    <Badge icon={RefreshCw} title="Easy Returns" sub="30-day policy" />
    <Badge icon={Shield} title="Secure Pay" sub="100% protected" />
  </div>
);
