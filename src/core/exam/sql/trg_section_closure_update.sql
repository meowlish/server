CREATE OR REPLACE FUNCTION section_closure_update_trigger()
RETURNS TRIGGER AS $$
BEGIN
    -- Only act if parent_id actually changes
    IF OLD.parent_id IS DISTINCT FROM NEW.parent_id THEN

        -- 1. Prevent cycles (cannot move under own subtree)
        IF NEW.parent_id IS NOT NULL AND EXISTS (
            SELECT 1
            FROM section_closures
            WHERE ancestor_id = OLD.id
            AND descendant_id = NEW.parent_id
        ) THEN
            RAISE EXCEPTION 'Cannot move a section under its own descendant';
        END IF;

        -- 2. Delete old ancestor paths (excluding self-paths)
        DELETE FROM section_closures
        WHERE ancestor_id IN (
            SELECT ancestor_id
            FROM section_closures
            WHERE descendant_id = OLD.id
            AND ancestor_id <> OLD.id
        )
        AND descendant_id IN (
            SELECT descendant_id
            FROM section_closures
            WHERE ancestor_id = OLD.id
        );

        -- 3. Insert new ancestor paths
        IF NEW.parent_id IS NOT NULL THEN
            INSERT INTO section_closures (ancestor_id, descendant_id, depth)
            SELECT
                ancestor.ancestor_id,
                descendant.descendant_id,
                ancestor.depth + descendant.depth + 1
            FROM section_closures ancestor
            JOIN section_closures descendant
                ON descendant.ancestor_id = OLD.id
            WHERE ancestor.descendant_id = NEW.parent_id
                ON CONFLICT DO NOTHING;
        END IF;

    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_section_closure_update
AFTER UPDATE OF parent_id ON sections
FOR EACH ROW
EXECUTE FUNCTION section_closure_update_trigger();
