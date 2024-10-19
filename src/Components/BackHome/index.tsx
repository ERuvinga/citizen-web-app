import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const BackHomeBtn = () => {
  return (
    <div className="containerBtnToHome">
      <Link href={'/'} className="BtnToHome">
        <ArrowLeftIcon className="Icone" />
      </Link>
    </div>
  );
};

export default BackHomeBtn;
