"use client";

interface FrameRowProps {
    children: React.ReactNode
}

const FrameRow = ({
    children
}: FrameRowProps) => {
    return (
        <div className="flex flex-col gap-x-4 gap-y-4 md:flex-row my-4">
            {children}
        </div>
    );
}

export default FrameRow;