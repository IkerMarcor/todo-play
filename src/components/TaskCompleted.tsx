import { useState } from "react";

import Checkmark from "@/components/icons/Checkmark";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
    Drawer,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerDescription,
    DrawerTitle,
  } from "@/components/ui/drawer";

interface Props {
  name: string;
  title: string;
  description: string;
}

export default function Task({ name, title, description }: Props) {
  const [progress, setProgress] = useState(13);
  return (
    <Drawer>
      {/* Para activar el boton se tiene que agregar el comp DrawerTrigger */}
      <Button variant="completed" disabled>
        <Label className="text-green-600 line-through">{name}</Label>
        <Badge variant="completed">
            <Checkmark/>
        </Badge>
      </Button>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>{description}</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="flex items-center justify-center space-x-2">
              <div className="flex-1 text-center">
                <div className="text-[0.70rem] uppercase text-muted-foreground">
                  Level
                </div>
                <div className="text-7xl font-bold tracking-tighter">B</div>
              </div>
            </div>
            <div className="mt-3 h-[120px]"></div>
          </div>
          <DrawerFooter>
            <Progress value={progress} />
            <div className="text-5xl font-bold">0:00</div>
            <div className="my-3">
              <Button variant="secondary">Edit</Button>
              <Button variant="destructive">Eliminate</Button>
            </div>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
