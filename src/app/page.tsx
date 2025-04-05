"use client";

import {ModeToggle} from "@/components/mode-toggle";
import {usePrimaryColor} from "@/components/primary-provider";
import PrimaryToggle from "@/components/primary-toggle";
import {Button} from "@/components/ui/button";

export default function Home() {
  const {primaryColor} = usePrimaryColor();

  return (
    <div>
      <h1>Digital Marketplace</h1>
      <ModeToggle />
      <PrimaryToggle />
      <h2 className={`text-${primaryColor}-500`}>Home</h2>
      <Button
        className={`bg-${primaryColor}-700 text-white hover:bg-${primaryColor}-800 transition-colors disabled:bg-${primaryColor}-300`}
      >
        Button
      </Button>
    </div>
  );
}
