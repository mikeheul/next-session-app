"use client"

import { Button } from "@/components/ui/button";
import axios from "axios";
import { UserRoundMinusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface UnsubscribeButtonProps {
    traineeId: string;
    sessionId: string;
}

const UnsubscribeButton = ({
    traineeId,
    sessionId
}: UnsubscribeButtonProps) => {

    const router = useRouter();

    const unsubscribe = async () => {
        try {
            await axios.delete(`/api/session/${sessionId}/${traineeId}/unsubscribe`);
            toast.success("Trainee unsubscribed !", {
                style: {
                    backgroundColor: '#5bd7d1',
                    color: '#1a4c4a',
                },
                iconTheme: {
                    primary: '#1a4c4a',
                    secondary: '#FFFAEE',
                },
            });
            router.refresh();
        } catch (error) {
            toast.error("Something went wrong");
        }
    }

    return (
        <Button onClick={unsubscribe} className="text-white mr-0 xs:mr-2 bg-red-600 hover:bg-red-600/90">
            <UserRoundMinusIcon size={20} className="mr-2" /> 
            Unsubscribe
        </Button>
    );
}

export default UnsubscribeButton;