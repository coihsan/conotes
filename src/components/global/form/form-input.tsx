import React, {useEffect, useRef} from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkmark24Regular, Dismiss24Regular } from "@fluentui/react-icons";

type Props = {
    formValue: string;
    testId: string;
    onSubmit: (values: z.infer<typeof formSchema>) => void;
    placeholder?: string;
    editingFormId: string;
    onCancel?: () => void;
    changeHandler: (editingFormId: string, value: string) => void;
};

const formSchema = z.object({
    formLabel: z.string().min(2).max(30),
});

const FormInput: React.FC<Props> = ({
    formValue,
    testId,
    onSubmit,
    onCancel,
    placeholder = "Enter text",
    changeHandler,
    editingFormId,
}) => {
    const formRef = useRef<HTMLFormElement>(null);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            formLabel: formValue || "",
        },
    });

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
          if (formRef.current && !formRef.current.contains(event.target as Node)) {
            if (form.getValues("formLabel").trim() !== "")
     {
              form.handleSubmit(onSubmit)(event as unknown as React.SyntheticEvent);
            } else {
              onCancel?.();
            }
          }
        };
    
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [form, onSubmit, onCancel]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex" data-testid={testId} ref={formRef}>
                <FormField control={form.control} name="formLabel" render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Input
                            className="h-7"
                                aria-label={formValue}
                                type="text"
                                defaultValue={formValue}
                                autoFocus
                                maxLength={30}
                                placeholder={placeholder}
                                {...field}
                                onChange={(event) => {
                                    changeHandler(editingFormId, event.target.value);
                                }}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <div className="flex gap-2">
                    <Button size={'icon'} type="submit"><Checkmark24Regular /></Button>
                    {onCancel && <Button type="button" size={'icon'} variant="outline" onClick={onCancel}><Dismiss24Regular /></Button>}
                </div>
            </form>
        </Form>
    );
};

export default FormInput;
