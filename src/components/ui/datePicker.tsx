"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect } from "react";

export function DatePicker({
//   onChange,
  defaultValue,
}: {
  onChange: (e: Date | undefined) => void;
  defaultValue?: string;
}) {
  console.log(defaultValue);
  const [date, setDate] = React.useState<Date>();

  useEffect(() => {
    if (defaultValue) {
      setDate(new Date(defaultValue));
    }
  }, [defaultValue]);

//   const handleSelect = (e: Date | undefined) => {
//     console.log("Handle Date Picker clicked");
//     onChange(e);
//     setDate(e);
//   };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "flex justify-start h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={() => {}}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}