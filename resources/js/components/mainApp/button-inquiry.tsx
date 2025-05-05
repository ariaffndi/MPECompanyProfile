import { Link } from '@inertiajs/react';
import { ShoppingCart } from 'lucide-react';


export default function ButtonInquiry() {
  return (
      <Link href='#' className={'btn btn-sm border-0 shadow-lg bg-blue-400 w-fit rounded-lg text-white'}>
          <ShoppingCart size={16} /> Pemesanan IPAL
      </Link>
  );
}
