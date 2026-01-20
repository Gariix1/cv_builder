import { useI18n } from "../../../i18n";
import type { Certificate } from "../../../models/cv.schema";
import { CVSectionList } from "../../../components/sections";
import { hasText } from "../../../utils/validation";

interface CertificatesSectionProps {
  certificates: Certificate[];
}

export const hasCertificateContent = (item: Certificate) =>
  hasText(item.name) ||
  hasText(item.issuer) ||
  hasText(item.year) ||
  hasText(item.link);

export const getVisibleCertificates = (certificates: Certificate[]) =>
  certificates.filter(hasCertificateContent);

const CertificateItem = ({ item }: { item: Certificate }) => (
  <div className="cv-certificate">
    <p className="cv-certificate__name">{item.name}</p>
    <p className="cv-certificate__meta">
      {item.issuer} · {item.year}
    </p>
    {item.link ? <p className="cv-certificate__link">{item.link}</p> : null}
  </div>
);

export const CertificatesSection = ({
  certificates,
}: CertificatesSectionProps) => {
  const { t } = useI18n();
  const visibleItems = getVisibleCertificates(certificates);

  return (
    <CVSectionList
      title={t("sectionCertificates")}
      items={visibleItems}
      className="cv-certificate-list"
      renderItem={(item) => <CertificateItem key={item.id} item={item} />}
    />
  );
};
