"use client"

import { Button } from "@/components/ui/button";
import axios from "axios";
import { UserRoundPlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface SubscribeButtonProps {
    traineeId: string;
    sessionId: string;
}

const SubscribeButton = ({
    traineeId,
    sessionId
}: SubscribeButtonProps) => {

    const router = useRouter();

    const subscribe = async () => {
        try {
            await axios.post(`/api/session/${sessionId}/${traineeId}/subscribe`);
            toast.success("Trainee subscribed !");
            router.refresh();
        } catch (error) {
            toast.error("Something went wrong");
        }
    }

    return (
        <Button onClick={subscribe} className="mr-5 bg-green-800 hover:bg-green-800/90">
            <UserRoundPlusIcon size={20} className="mr-2" /> 
            Subscribe
        </Button>
    );
}

export default SubscribeButton;