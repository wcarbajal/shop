import { getCategories } from '@/actions';
import { Footer, Sidebar, TopMenu } from '@/components';

export default async function ShopLayout( { children }: {
  children: React.ReactNode;
} ) {

  const categorias = await getCategories();
  return (
    <main className="min-h-screen">

      <TopMenu categorias={ categorias } />
      <Sidebar />

      <div className="px-0 sm:px-10">
        { children }

      </div>

      <Footer />
    </main>
  );
}