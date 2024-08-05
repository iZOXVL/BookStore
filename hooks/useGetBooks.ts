// hooks/useFetchBooks.ts
import { useEffect, useState } from 'react';

interface Book {
  libreriaMaterialId: string;
  titulo: string;
  precio: number;
  portadaBase64: string;
  autorLibro: string;
}

const useFetchBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('https://localhost:7297/api/LibroMaterial');
        if (!response.ok) {
          throw new Error('Error fetching books');
        }
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return { books, loading, error };
};

export default useFetchBooks;
