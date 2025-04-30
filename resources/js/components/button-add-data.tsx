import { Link } from '@inertiajs/react';
import { PlusCircle } from 'lucide-react';

type ButtonLinkProps = {
  href: string;
};

export default function ButtonAddData({ href }: ButtonLinkProps) {
  return (
      <Link href={href} className={'btn btn-sm btn-info w-fit rounded-xl'}>
          <PlusCircle size={16} /> Tambah Data
      </Link>
  );
}
