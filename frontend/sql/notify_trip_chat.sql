CREATE OR REPLACE FUNCTION notify_trip_chat() RETURNS trigger AS $$
BEGIN
  PERFORM pg_notify('new_trip_chat', row_to_json(NEW)::text);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trip_chat_notify_trigger
AFTER INSERT ON trip_chats
FOR EACH ROW EXECUTE FUNCTION notify_trip_chat();