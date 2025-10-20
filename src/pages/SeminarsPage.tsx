import { useState } from 'react';
import Layout from '@/components/Layout';
import SeminarTable from '@/components/SeminarTable';
import SeminarForm from '@/components/SeminarForm';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function SeminarsPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleCreateSeminar = (data: any) => {
    toast.success('Семинар успешно создан!');
    console.log('New seminar:', data);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <Button
          onClick={() => setIsFormOpen(true)}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-6 text-base"
        >
          Добавить семинар
        </Button>

        <SeminarTable />
      </div>

      <SeminarForm
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleCreateSeminar}
      />
    </Layout>
  );
}
