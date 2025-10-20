import Layout from '@/components/Layout';

export default function EmptyPage() {
  return (
    <Layout>
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Страница в разработке</h2>
          <p className="text-gray-600">Этот раздел скоро будет доступен</p>
        </div>
      </div>
    </Layout>
  );
}
