import { useI18n } from "../../i18n";
import { Button } from "../ui";

interface EditorItemActionsProps {
  onMoveUp: () => void;
  onMoveDown: () => void;
  onRemove: () => void;
  disableUp?: boolean;
  disableDown?: boolean;
}

export const EditorItemActions = ({
  onMoveUp,
  onMoveDown,
  onRemove,
  disableUp,
  disableDown,
}: EditorItemActionsProps) => {
  const { t } = useI18n();

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={onMoveUp}
        disabled={disableUp}
      >
        {t("editorActionUp")}
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={onMoveDown}
        disabled={disableDown}
      >
        {t("editorActionDown")}
      </Button>
      <Button type="button" variant="soft" size="sm" onClick={onRemove}>
        {t("editorActionRemove")}
      </Button>
    </>
  );
};
