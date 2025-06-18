import type { JSONSchema } from 'sveltekit-superforms';

export const schema = {
    "type": "object",
    "properties": {
    "vehicle_id": {
      "type": "integer"
    },
    "driver_id": {
      "type": ["integer", "null"]
    },
    "date": {
      "type": "string",
      "format": "date"
    },
    "trip_number": {
      "type": "integer",
      "enum": [1, 2, 3]
    },
    "is_gantung": {
      "type": "boolean",
      "default": false
    },
    "start_destination_id": {
      "type": "integer"
    },
    "end_destination_id": {
      "type": "integer"
    },
    "is_checked": {
      "type": "boolean",
      "default": false
    },
    "is_verified": {
      "type": "boolean",
      "default": false
    },
    "is_double_checked": {
      "type": "boolean",
      "default": false
    },
    "is_incomplete": {
      "type": "boolean",
      "default": false
    },
    "remark": {
      "type": ["string", "null"],
      "maxLength": 1000
    },
    "created_by": {
      "type": ["integer", "null"]
    }
  },
  "required": [
    "vehicle_id",
    "date",
    "trip_number",
    "start_destination_id",
    "end_destination_id"
  ],
  "additionalProperties": false
} as const satisfies JSONSchema
