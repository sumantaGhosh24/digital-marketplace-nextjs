"use client";

import {Pen} from "lucide-react";

import {usePrimaryColor} from "./primary-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {Button} from "./ui/button";

const PrimaryToggle = () => {
  const {setPrimaryColor} = usePrimaryColor();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Pen />
          <span className="sr-only">Toggle primary color</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="flex flex-wrap w-[180px] gap-2 p-2"
      >
        <DropdownMenuItem
          className="bg-red-700 rounded-full block px-3 py-3 text-sm"
          onClick={() => setPrimaryColor("red")}
        >
          <span className="bg-red-700 hover:bg-red-800 disabled:bg-red-300 text-red-500"></span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="bg-orange-700 rounded-full block px-3 py-3 text-sm"
          onClick={() => setPrimaryColor("orange")}
        >
          <span className="bg-orange-700 hover:bg-orange-800 disabled:bg-orange-300 text-orange-500"></span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="bg-amber-700 rounded-full block px-3 py-3 text-sm"
          onClick={() => setPrimaryColor("amber")}
        >
          <span className="bg-amber-700 hover:bg-amber-800 disabled:bg-amber-300 text-amber-500"></span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="bg-yellow-700 rounded-full block px-3 py-3 text-sm"
          onClick={() => setPrimaryColor("yellow")}
        >
          <span className="bg-yellow-700 hover:bg-yellow-800 disabled:bg-yellow-300 text-yellow-500"></span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="bg-lime-700 rounded-full block px-3 py-3 text-sm"
          onClick={() => setPrimaryColor("lime")}
        >
          <span className="bg-lime-700 hover:bg-lime-800 disabled:bg-lime-300 text-lime-500"></span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="bg-green-700 rounded-full block px-3 py-3 text-sm"
          onClick={() => setPrimaryColor("green")}
        >
          <span className="bg-green-700 hover:bg-green-800 disabled:bg-green-300 text-green-500"></span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="bg-emerald-700 rounded-full block px-3 py-3 text-sm"
          onClick={() => setPrimaryColor("emerald")}
        >
          <span className="bg-emerald-700 hover:bg-emerald-800 disabled:bg-emerald-300 text-emerald-500"></span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="bg-teal-700 rounded-full block px-3 py-3 text-sm"
          onClick={() => setPrimaryColor("teal")}
        >
          <span className="bg-teal-700 hover:bg-teal-800 disabled:bg-teal-300 text-teal-500"></span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="bg-cyan-700 rounded-full block px-3 py-3 text-sm"
          onClick={() => setPrimaryColor("cyan")}
        >
          <span className="bg-cyan-700 hover:bg-cyan-800 disabled:bg-cyan-300 text-cyan-500"></span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="bg-sky-700 rounded-full block px-3 py-3 text-sm"
          onClick={() => setPrimaryColor("sky")}
        >
          <span className="bg-sky-700 hover:bg-sky-800 disabled:bg-sky-300 text-sky-500"></span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="bg-blue-700 rounded-full block px-3 py-3 text-sm"
          onClick={() => setPrimaryColor("blue")}
        >
          <span className="bg-blue-700 hover:bg-blue-800 disabled:bg-blue-300 text-blue-500"></span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="bg-indigo-700 rounded-full block px-3 py-3 text-sm"
          onClick={() => setPrimaryColor("indigo")}
        >
          <span className="bg-indigo-700 hover:bg-indigo-800 disabled:bg-indigo-300 text-indigo-500"></span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="bg-violet-700 rounded-full block px-3 py-3 text-sm"
          onClick={() => setPrimaryColor("violet")}
        >
          <span className="bg-violet-700 hover:bg-violet-800 disabled:bg-violet-300 text-violet-500"></span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="bg-purple-700 rounded-full block px-3 py-3 text-sm"
          onClick={() => setPrimaryColor("purple")}
        >
          <span className="bg-purple-700 hover:bg-purple-800 disabled:bg-purple-300 text-purple-500"></span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="bg-fuchsia-700 rounded-full block px-3 py-3 text-sm"
          onClick={() => setPrimaryColor("fuchsia")}
        >
          <span className="bg-fuchsia-700 hover:bg-fuchsia-800 disabled:bg-fuchsia-300 text-fuchsia-500"></span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="bg-pink-700 rounded-full block px-3 py-3 text-sm"
          onClick={() => setPrimaryColor("pink")}
        >
          <span className="bg-pink-700 hover:bg-pink-800 disabled:bg-pink-300 text-pink-500"></span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="bg-rose-700 rounded-full block px-3 py-3 text-sm"
          onClick={() => setPrimaryColor("rose")}
        >
          <span className="bg-rose-700 hover:bg-rose-800 disabled:bg-rose-300 text-rose-500"></span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PrimaryToggle;
