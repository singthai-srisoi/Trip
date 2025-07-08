<script lang="ts">
	import { onMount } from "svelte";
	import type { PageData } from "./$types";

    interface Props {
        data: PageData
    }

    let {
        data
    }: Props = $props();

    $inspect(data)


   import { io } from 'socket.io-client'
	import { enhance } from "$app/forms";

    const socket = io('http://localhost:3000') // connects to same origin

    const tripId = data.id // example

    socket.emit('subscribe_trip', tripId)

    socket.on('trip_chat', (chat) => {
        console.log('📨 New chat message for trip', chat)
    })
</script>

<div class="h min-h-[60dvh] max-h-[60dvh] overflow-y-auto px-4 pb-4 border-2 border-base-300 rounded-sm">
    <!-- <div class="chat chat-start">
        <div class="chat-bubble chat-bubble-primary text-sm">What kind of nonsense is this</div>
    </div>
    <div class="chat chat-start">
        <div class="chat-bubble chat-bubble-secondary text-sm">
            Put me on the Council and not make me a Master!??
        </div>
    </div>
    <div class="chat chat-start">
        <div class="chat-bubble chat-bubble-accent text-sm">
            That's never been done in the history of the Jedi.
        </div>
    </div>
    <div class="chat chat-start">
        <div class="chat-bubble chat-bubble-neutral text-sm">It's insulting!</div>
    </div>
    <div class="chat chat-end">
        <div class="chat-bubble chat-bubble-info text-sm">Calm down, Anakin.</div>
    </div>
    <div class="chat chat-end">
        <div class="chat-bubble chat-bubble-success text-sm">You have been given a great honor.</div>
    </div>
    <div class="chat chat-end">
        <div class="chat-bubble chat-bubble-warning text-sm">To be on the Council at your age.</div>
    </div>
    <div class="chat chat-end">
        <div class="chat-bubble chat-bubble-error text-sm">It's never happened before.</div>
    </div>
        <div class="chat chat-start">
    <div class="chat-bubble chat-bubble-primary text-sm">What kind of nonsense is this</div>
    </div>
    <div class="chat chat-start">
        <div class="chat-bubble chat-bubble-secondary text-sm">
            Put me on the Council and not make me a Master!??
        </div>
    </div>
    <div class="chat chat-start">
        <div class="chat-bubble chat-bubble-accent text-sm">
            That's never been done in the history of the Jedi.
        </div>
    </div>
    <div class="chat chat-start">
        <div class="chat-bubble chat-bubble-neutral text-sm">It's insulting!</div>
    </div>
    <div class="chat chat-end">
        <div class="chat-bubble chat-bubble-info text-sm">Calm down, Anakin.</div>
    </div>
    <div class="chat chat-end">
        <div class="chat-bubble chat-bubble-success text-sm">You have been given a great honor.</div>
    </div>
    <div class="chat chat-end">
        <div class="chat-bubble chat-bubble-warning text-sm">To be on the Council at your age.</div>
    </div>
    <div class="chat chat-end">
        <div class="chat-bubble chat-bubble-error text-sm">It's never happened before.</div>
    </div> -->
     {#each data.trips?.trip_chats ?? [] as chat (chat.id)}
      <div class="chat" class:chat-start={chat.user_id} class:chat-end={!chat.user_id}>
        <div class="chat-bubble text-sm" class:chat-bubble-primary={chat.user_id} class:chat-bubble-success={!chat.user_id}>
          {chat.message}
        </div>
      </div>
    {/each}
  </div>

<form action="?/sent" method="post" use:enhance>
    <input type="hidden" name="trip_id" value={data.id} />
    <input type="hidden" name="user_id" value={1} />

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