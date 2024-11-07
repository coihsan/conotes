import React from "react";
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
import { Dismiss24Regular } from "@fluentui/react-icons";

type Props = {
    formValue: string;
    testId: string;
    onSubmit: (values: z.infer<typeof formSchema>) => void;
    placeholder?: string;
    editingFormId: string;
    changeHandler: (editingFormId: string, value: string) => void;
};

const formSchema = z.object({
    formLabel: z.string().min(2).max(30),
});

const FormInput: React.FC<Props> = ({
    formValue,
    testId,
    onSubmit,
    placeholder = "Enter text",
    changeHandler,
    editingFormId,
}) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            formLabel: formValue || "",
        },
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" data-testid={testId}>
                <FormField control={form.control} name="formLabel" render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Input
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
            </form>
        </Form>
    );
};

export default FormInput;
