import { getApiDocs } from "@/lib/swagger";
import ReactSwagger from "../components/Api/react-swagger";

const IndexPage = async () => {
  const spec = await getApiDocs();
  return (
    <section>
      <ReactSwagger spec={spec} url="/swagger.json" />
    </section>
  );
};

export default IndexPage;

export const dynamic = "force-dynamic";
