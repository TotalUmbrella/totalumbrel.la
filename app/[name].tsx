import { getMarkdownNames, getMarkdownByName } from "./markdown";

export default function Name({ metadata, contentHtml }) {
    // Render post...
    <div>
        {metadata.title}
    </div>
  }

export async function getStaticPaths() {
    const list1 = await getMarkdownNames();
    const paths = list1.map((name1) => ({
        params: { name: name1 },
    }));
    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    const { metadata, contentHtml } = await getMarkdownByName(params.name);
    return {
        props: {
            metadata,
            contentHtml,
        },
    };
}