import { AlertTriangle, CheckCircleIcon, InfoIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const bannerVariants = cva(
    "border text-center p-4 text-sm flex items-center w-full",
    {
        variants: {
            variant: {
                warning: "bg-red-200/80 dark:bg-red-900 border-red-30 text-primary",
                success: "bg-emerald-700 border-emerald-800 text-secondary",
                info: "bg-amber-200 border-amber-300 text-amber-800",
            }
        },
        defaultVariants: {
            variant: "warning"
        }
    }
)

interface BannerProps extends VariantProps<typeof bannerVariants> {
    label: string;
}

const iconMap = {
    warning: AlertTriangle,
    success: CheckCircleIcon,
    info: InfoIcon
}

const Banner = ({
    label,
    variant
}:BannerProps) => {

    const Icon = iconMap[variant || "warning"]

    return ( 
        <div className={cn(bannerVariants({ variant }))}>
            <Icon className="h-4 w-4 mr-2" />
            { label }
        </div>
    );
}

export default Banner;