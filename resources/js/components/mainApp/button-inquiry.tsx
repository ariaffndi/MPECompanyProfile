import { Link } from '@inertiajs/react';
import { ShoppingCart } from 'lucide-react';


export default function ButtonInquiry() {
  return (
      <Link href="#" className="btn btn-sm text-base-200 w-fit rounded-lg border-none bg-sky-500 shadow-none hover:bg-sky-600">
          <ShoppingCart size={16} /> Pemesanan IPAL
      </Link>
  );
}
