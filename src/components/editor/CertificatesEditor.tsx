import { useCVStore } from "../../store/cvStore";
import { useI18n } from "../../i18n";
import { EditorListSection } from "./EditorListSection";
import { CertificateCard } from "./CertificateCard";

export const CertificatesEditor = () => {
  const { t } = useI18n();
  const certificates = useCVStore((state) => state.cv.certificates);
  const addCertificate = useCVStore((state) => state.actions.certificates.add);

  return (
    <EditorListSection
      title={t("sectionCertificates")}
      description={t("editorDescriptionCertificates")}
      items={certificates}
      addLabel={t("editorAddCertificate")}
      onAdd={addCertificate}
      emptyState={t("editorEmptyCertificates")}
      renderItem={(item, index, total) => (
        <CertificateCard
          key={item.id}
          item={item}
          index={index}
          total={total}
        />
      )}
    />
  );
};
