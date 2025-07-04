<script lang="ts">
    import CheckIcon from "@lucide/svelte/icons/check";
    import ChevronsUpDownIcon from "@lucide/svelte/icons/chevrons-up-down";
    import { onMount, tick } from "svelte";
    import * as Command from "$lib/components/ui/command/index.js";
    import * as Popover from "$lib/components/ui/popover/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import { cn } from "$lib/utils.js";

    interface Props {
        placeholder?: string
        label?: string
        error?: string[]
        items: {
            value: any,
            label: any,
        }[]
        value: any
    }

    let {
        label = "",
        placeholder = "",
        error,
        items,
        value = $bindable()
    }: Props = $props()

    let open = $state(false);
    let triggerRef = $state<HTMLButtonElement>(null!);
    // const selectedValue = $derived(
    //     items.find((f) => f.value === value)?.label
    // );

    let selectedValue: any = $state("")
    $effect(() => {
        const item = items.find((f) => f.value == value)
        selectedValue = item ? item.label : ""
    });

    // We want to refocus the trigger button when the user selects
    // an item from the list so users can continue navigating the
    // rest of the form with the keyboard.
    function closeAndFocusTrigger() {
        open = false;
        tick().then(() => {
            triggerRef.focus();
        });
    }
</script>

<Popover.Root bind:open>
    <Popover.Trigger bind:ref={triggerRef}>
    {#snippet child({ props })}
    <label class="floating-label">
        <span>{label}</span>
        <Button
            {...props}
            class={error ? "w-full input input-error outline-0 justify-between rounded-xs border"
                : "w-full input outline-0 justify-between rounded-xs border border-base-300"
            }
            role="combobox"
            aria-expanded={open}
        >
            {#if selectedValue}
                {selectedValue}
            {:else}
                <span class="opacity-60">{placeholder}</span>
            {/if}
            <ChevronsUpDownIcon class="opacity-50" />
        </Button>
    </label>
    {#if error}
        <span class="text-red-600">{error[0]}</span>
    {/if}
    {/snippet}
    </Popover.Trigger>
    <Popover.Content class="w-full p-0">
        <Command.Root class="w-full pt-3">
            <Command.Input placeholder="Search..." />
            <Command.List>
                <Command.Empty>No Value</Command.Empty>
                <Command.Group value="frameworks">
                {#each items as item (item.value)}
                    <Command.Item
                        value={item.label}
                        onSelect={() => {
                            value = item.value;
                            closeAndFocusTrigger();
                        }}
                    >
                        <CheckIcon
                            class={cn(value !== item.value && "text-transparent")}
                        />
                        {item.label}
                    </Command.Item>
                {/each}
                </Command.Group>
            </Command.List>
        </Command.Root>
    </Popover.Content>
</Popover.Root>