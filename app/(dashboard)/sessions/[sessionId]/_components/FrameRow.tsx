"use client";

interface FrameRowProps {
    children: React.ReactNode
}

const FrameRow = ({
    children
}: FrameRowProps) => {
    return (
        <div className="flex flex-col gap-x-2 gap-y-2 md:flex-row my-2">
            {children}
        </div>
    );
}

export default FrameRow;