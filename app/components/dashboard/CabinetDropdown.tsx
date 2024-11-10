"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { useCabinet } from "@/app/hooks/useCabinet"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

interface CabinetDropdownProps {
    onChange: (...event: any[]) => void;
    onBlur: () => void;
    value: string;
    name: string;
    ref?: React.Ref<any>;
    disabled?: boolean;
}

export const CabinetDropdown: React.FC<CabinetDropdownProps> = ({
    onChange,
    value: controlledValue,
    disabled
}) => {
    const [open, setOpen] = React.useState(false)
    const [internalValue, setInternalValue] = React.useState(controlledValue || "")
    const { cabinets } = useCabinet();

    React.useEffect(() => {
        setInternalValue(controlledValue || "")
    }, [controlledValue])

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                    disabled={disabled}
                >
                    {internalValue
                        ? cabinets.find((cabinet) => cabinet._id === internalValue)?.cabinetType
                        : "Select cabinet..."}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search cabinet..." />
                    <CommandList>
                        <CommandEmpty>No cabinet found.</CommandEmpty>
                        <CommandGroup>
                            {cabinets.map((cabinet) => (
                                <CommandItem
                                    key={cabinet._id}
                                    value={cabinet._id}
                                    onSelect={(currentValue) => {
                                        const newValue = currentValue === internalValue ? "" : currentValue;
                                        setInternalValue(newValue);
                                        onChange(newValue);
                                        setOpen(false);
                                    }}
                                >
                                    {cabinet.cabinetType}
                                    <Check
                                        className={cn(
                                            "ml-auto",
                                            internalValue === cabinet._id ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
