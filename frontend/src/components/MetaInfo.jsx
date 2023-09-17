import { Helmet } from "react-helmet-async";

const MetaInfo = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keyword" content={keywords} />
    </Helmet>
  );
};

MetaInfo.defaultProps = {
  title: "Hi there, this is XuShop",
  description:
    "We sell produts to alumni who have a deep love for their alma mater ",
  keywords: "college souvenir, T shirts",
};

export default MetaInfo;
