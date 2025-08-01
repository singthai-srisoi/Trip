<script lang="ts">
	import { onMount } from "svelte";
	import type { PageData } from "./$types";
    import date from 'date-and-time'

    interface Props {
        data: PageData
    }

    let {
        data
    }: Props = $props();
    let trip_chats = $state(data.trip_chats)
    let format_time = (time: Date | string) => {
        if (typeof time === 'string') time = new Date(time)
        return date.format(time, "YYYY MM DD HH:mm")
    }

    import { io } from 'socket.io-client'
    import { enhance } from "$app/forms";
	import { PUBLIC_WS_ENDPOINT } from "$env/static/public";

    const socket = io(PUBLIC_WS_ENDPOINT) // connects to same origin

    const tripId = data.id // example

    socket.emit('subscribe_trip', tripId)

    socket.on('trip_chat', (chat) => {
        console.log('📨 New chat message for trip', chat)
        if (data.trips == null) return
        // @ts-ignore
        // get all id
        let ids = trip_chats.map((a) => a.id)
        if (!ids.includes(chat.id)) {
            trip_chats = [...trip_chats, ...chat]
        }
        if ("Notification" in window && Notification.permission === "granted") {
            new Notification("New Chat Message", {
                body: chat.message,
            })
        }
    })
</script>

<div class="h min-h-[60dvh] max-h-[60dvh] overflow-y-auto px-4 pb-4 border-2 border-base-300 rounded-sm">
     {#each trip_chats ?? [] as chat (chat.id)}
      <div class="chat" class:chat-start={chat.user_id != data.user.id} class:chat-end={!(chat.user_id != data.user.id)}>
        <div class="chat-bubble text-sm" class:chat-bubble-primary={chat.user_id != data.user.id} class:chat-bubble-success={!(chat.user_id != data.user.id)}>
          {chat.message}

          <span class="text-xs"><br/>{chat.timestamp && format_time(chat.timestamp)}</span>
          
        </div>
      </div>
      
    {/each}
  </div>

<form action="?/sent" method="post" use:enhance>
    <input type="hidden" name="trip_id" value={data.id} />
    <input type="hidden" name="user_id" value={data.user.id} />

    <div class="s sticky bottom-0">
        <label class="input input-border border border-base-300 w-full">
            <input type="text" class="grow" placeholder="Type a message..." name="message" />
            <button type="submit" aria-label="Send">
                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m12 18-7 3 7-18 7 18-7-3Zm0 0v-5"/>
                </svg>
            </button>
            

        </label>
    </div>
</form>