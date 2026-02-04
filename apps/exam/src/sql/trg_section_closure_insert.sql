CREATE OR REPLACE FUNCTION section_closure_insert_trigger()
RETURNS TRIGGER AS $$
BEGIN
    -- Insert self-reference
    INSERT INTO section_closures(ancestor_id, descendant_id, depth)
    VALUES (NEW.id, NEW.id, 0)
    ON CONFLICT DO NOTHING;

    -- Insert relationships to ancestors
    IF NEW.parent_id IS NOT NULL THEN
        INSERT INTO section_closures (ancestor_id, descendant_id, depth)
        SELECT
            a.ancestor_id,
            NEW.id,
            a.depth + 1
        FROM section_closures a
        WHERE a.descendant_id = NEW.parent_id
        ON CONFLICT DO NOTHING;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_section_closure_insert
AFTER INSERT ON sections
FOR EACH ROW
EXECUTE FUNCTION section_closure_insert_trigger();
