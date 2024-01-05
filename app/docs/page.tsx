import { getApiDocs } from "@/lib/swagger";
import ReactSwagger from "../components/Api/react-swagger";

const IndexPage = async () => {
  const spec = await getApiDocs();
  return (
    <section>
      <ReactSwagger spec={spec} />
    </section>
  );
};

export default IndexPage;
