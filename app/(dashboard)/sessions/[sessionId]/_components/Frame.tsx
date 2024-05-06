"use client";

interface FrameProps {
    label: string;
    children: React.ReactNode;
}

const Frame = ({
    label,
    children
}: FrameProps) => {
    return (
        <div className="basis-2/4 border border-slate-200 p-6 rounded-md">
            <h2 className="text-xl text-center xs:text-left font-semibold">{label}</h2>
            <div className="flex flex-col gap-y-1 mt-6">
                {children}
            </div>
        </div>
    );
}

export default Frame;