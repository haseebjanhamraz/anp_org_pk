import Link from "next/link";
import { menu } from "../lib/Data"
import { usePathname } from 'next/navigation'


export default function DesktopMenu() {
    const pathname = usePathname()

    return (
        <div>
            <ul className="flex gap-2 uppercase text-lg font-bold text-red-600">
                {menu.map((item, index) => (
                    <li key={index}>
                        <Link className={`text-red-500 ${pathname === item.link ? 'active' :
                            'text-red-800 dark:hover:text-red-500 dark:text-red-800'}`}
                            href={item.link}>
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}
