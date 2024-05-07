"use client";

interface TraineeButtonProps {
    traineeId: string;
}

import { Button } from "@/components/ui/button";
import { User2Icon } from "lucide-react";
import { useRouter } from "next/navigation";

const TraineeButton = ({
    traineeId
}: TraineeButtonProps) => {

    const router = useRouter();

    const profile = async () => {
        router.push(`/trainees/${traineeId}`)
    }

    return (
        <Button onClick={profile} className="bg-transparent border border-slate-400 text-slate-400 hover:bg-slate-800 mr-0 xs:mr-4">
            <User2Icon />
        </Button>
    );
}

export default TraineeButton;