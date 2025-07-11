// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			session: import("$lib/server/session.server").Session | null;	
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
		interface ComboOption {
			label: string
			value: string
		}
	}
	namespace Model {
		interface TimeStamp {
			created_at?: string
			updated_at?: string
		}
		interface Destination extends TimeStamp {
			id: number
			name: string
		}
		interface Vehicle {
			id: number
			plate_no: string
		}
		interface Trip {
			id: int
			vehicle: Vehicle
			points: Destination[]
		}
	}
}

export {};
