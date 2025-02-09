import { GetStaticProps, GetStaticPaths } from "next";
import { getMarkdownNames, getMarkdownByName } from "./markdown";

type Props = {
    title: string;
    date: string;
    contentHtml: string;
};

export default function Page({ title, date, contentHtml }: Props) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-2">{title}</h1>
        <p className="text-gray-500 text-sm mb-4">{new Date(date).toDateString()}</p>
        <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </div>
    );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { metadata, contentHtml } = await getMarkdownByName(params?.name as string);

  return {
    props: {
      title: metadata.title,
      date: metadata.date,
      contentHtml,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const names = getMarkdownNames();
  
  return {
    paths: names.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
};