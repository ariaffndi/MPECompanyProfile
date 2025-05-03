import { Link } from '@inertiajs/react';
import { ShoppingCart } from 'lucide-react';


export default function ButtonInquiry() {
  return (
      <Link href='#' className={'btn btn-sm bg-blue-400 w-fit rounded-lg text-base-200'}>
          <ShoppingCart size={16} /> Pemesanan IPAL
      </Link>
  );
}
