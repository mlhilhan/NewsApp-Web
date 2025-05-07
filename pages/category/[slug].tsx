import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { News, Category, Pagination } from "@/src/types";
import newsService from "@/src/services/newsService";
import CategoryPageContent from "@/src/components/category/CategoryPage";
import ErrorMessage from "@/src/components/ui/ErrorMessage";

interface CategoryPageProps {
  category?: Category;
  news: News[];
  pagination?: Pagination;
  error?: string;
}

export default function CategoryPage({
  category,
  news,
  pagination,
  error,
}: CategoryPageProps) {
  const router = useRouter();
  const { slug } = router.query;

  const categoryName = category?.name || (slug as string)?.replace(/-/g, " ");
  const capitalizedCategoryName = categoryName
    ? categoryName.charAt(0).toUpperCase() + categoryName.slice(1)
    : "";

  // Hata durumu
  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <>
      <Head>
        <title>{capitalizedCategoryName} Haberleri - Tek Haber</title>
        <meta
          name="description"
          content={`${capitalizedCategoryName} kategorisindeki en güncel haberler, son dakika gelişmeleri ve daha fazlası`}
        />
      </Head>

      <CategoryPageContent
        slug={slug as string}
        initialNews={news}
        category={category}
        initialPagination={pagination}
      />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  params,
  query,
}) => {
  try {
    const slug = params?.slug;
    const page = query.page ? parseInt(query.page as string, 10) : 1;

    if (!slug || Array.isArray(slug)) {
      return {
        props: {
          news: [],
          error: "Geçersiz kategori",
        },
      };
    }

    // Kategori bilgisini getir
    const categoryResponse = await newsService.getAllCategories();
    const category =
      categoryResponse.success && categoryResponse.data
        ? categoryResponse.data.find((cat) => cat.slug === slug)
        : undefined;

    // Kategoriye ait haberleri getir
    const newsResponse = await newsService.getNewsByCategory(slug, {
      page,
      limit: 10,
      sort: "publishedAt",
      order: "DESC",
    });

    if (!newsResponse.success) {
      return {
        props: {
          category,
          news: [],
          error: newsResponse.message || "Haberler yüklenirken bir hata oluştu",
        },
      };
    }

    return {
      props: {
        category,
        news: newsResponse.data || [],
        pagination: newsResponse.pagination,
      },
    };
  } catch (error) {
    console.error("Kategori sayfası veri getirme hatası:", error);
    return {
      props: {
        news: [],
        error: "Kategori haberleri yüklenirken bir hata oluştu",
      },
    };
  }
};
