import React from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

interface BTN_NoProps {
  text: string;
  title: string;
  buttonIcon?: React.ReactNode;
  detail?: string;
  yesText?: string;
  yesStyle?:
    | "destructive"
    | "link"
    | "default"
    | "outline"
    | "secondary"
    | "ghost";
  noStyle?:
    | "destructive"
    | "link"
    | "default"
    | "outline"
    | "secondary"
    | "ghost";
  noText?: string;
  callback?: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

const ButtonWarnning: React.FC<BTN_NoProps> = ({
  text,
  title,
  buttonIcon,
  detail = "Are you sure you want to proceed?",
  yesText = "Yes",
  yesStyle = "destructive",
  notStyle = "ghost",
  noText = "No",
  callback = () => {
    console.log("Action confirmed!");
  },
  ...props
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" {...props}>
          {buttonIcon ?? text}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <p>{detail}</p>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button size="sm" variant={notStyle}>
              {noText}
            </Button>
          </DialogClose>
          <Button size="sm" variant={yesStyle} onClick={callback}>
            {yesText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ButtonWarnning;
