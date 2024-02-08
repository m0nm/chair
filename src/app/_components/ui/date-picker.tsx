"use client";

import { format } from "date-fns";
import { FormControl } from "./form";
import { cn } from "@/app/_lib/utils";

import { Button } from "./button";
import { Calendar as CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Calendar, CalendarProps } from "./calendar";

type IProps = {
  disabled?: CalendarProps["disabled"];
  selectedDay: Date | undefined;
  setSelectedDay(v: Date | undefined): void;
};

export function DatePicker(props: IProps) {
  const { disabled, setSelectedDay, selectedDay } = props;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !selectedDay && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="h-4 w-4 ltr:mr-2 rtl:ml-2" />
            {selectedDay ? (
              format(selectedDay, "PPP")
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          disabled={disabled}
          mode="single"
          selected={selectedDay}
          onSelect={setSelectedDay}
          initialFocus
          classNames={{
            day_selected: "bg-primary-600 text-white",
            day_today: selectedDay ? undefined : "bg-primary-600 text-white",
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
