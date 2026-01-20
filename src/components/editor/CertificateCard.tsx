import { useI18n } from "../../i18n";
import type { Certificate } from "../../models/cv.schema";
import { useCVStore } from "../../store/cvStore";
import { EditorCard } from "./EditorCard";
import { EditorItemActions } from "./EditorItemActions";
import { FieldGrid } from "./FieldGrid";
import {
  CERTIFICATE_FIELDS,
  type CertificateFieldValues,
} from "./config/certificateFields";

interface CertificateCardProps {
  item: Certificate;
  index: number;
  total: number;
}

export const CertificateCard = ({
  item,
  index,
  total,
}: CertificateCardProps) => {
  const { t } = useI18n();
  const updateCertificate = useCVStore(
    (state) => state.actions.certificates.update,
  );
  const removeCertificate = useCVStore(
    (state) => state.actions.certificates.remove,
  );
  const moveCertificate = useCVStore(
    (state) => state.actions.certificates.move,
  );

  const onFieldChange = (
    field: keyof CertificateFieldValues,
    value: string,
  ) => {
    updateCertificate(item.id, { [field]: value } as Partial<Certificate>);
  };

  const fieldValues: CertificateFieldValues = {
    name: item.name,
    issuer: item.issuer,
    year: item.year,
    link: item.link,
  };

  return (
    <EditorCard
      title={`${t("fieldCertificateLabel")} ${index + 1}`}
      meta={item.name || t("editorMetaNewCertificate")}
      actions={
        <EditorItemActions
          onMoveUp={() => moveCertificate(item.id, "up")}
          onMoveDown={() => moveCertificate(item.id, "down")}
          onRemove={() => removeCertificate(item.id)}
          disableUp={index === 0}
          disableDown={index === total - 1}
        />
      }
    >
      <FieldGrid
        fields={CERTIFICATE_FIELDS}
        values={fieldValues}
        onChange={onFieldChange}
        keyPrefix={item.id}
      />
    </EditorCard>
  );
};
