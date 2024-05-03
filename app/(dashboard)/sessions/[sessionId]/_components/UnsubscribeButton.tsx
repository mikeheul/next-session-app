"use client"

import { Button } from "@/components/ui/button";
import { UserRoundMinusIcon } from "lucide-react";

interface UnsubscribeButtonProps {
    trainee: any;
}

const UnsubscribeButton = ({
    trainee
}: UnsubscribeButtonProps) => {

    const unsubscribe = () => {
       alert(trainee);
    }

    return (
        <Button onClick={unsubscribe} className="mr-5 bg-red-500 hover:bg-red-500/90">
            <UserRoundMinusIcon size={20} className="mr-2" /> 
            Unsubscribe
        </Button>
    );
}

export default UnsubscribeButton;