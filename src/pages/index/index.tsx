import styles from './index.less';
import { getPhotoApi } from '@/services/photo';
import { useEffect } from 'react';

export default function Index() {
  const getPhoto = async () => {
    await getPhotoApi();
  };

  useEffect(() => {
    getPhoto();
  }, []);

  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
    </div>
  );
}
