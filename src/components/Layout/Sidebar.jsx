import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  DocumentTextIcon,
  HomeIcon,
  PencilSquareIcon,
  UsersIcon,
  UserPlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { NavLink } from 'react-router-dom'
import { userAtom } from '../../utils/atom'
import { useAtom } from 'jotai'
// import { User } from '../../utils/type'

const navigation = [
  { name: 'HOME', href: '/', icon: HomeIcon, current: true },
  { name: 'アセスメントを実施', href: '/assessment', icon: PencilSquareIcon, current: false },
  { name: 'アセスメント結果を確認', href: '/result', icon: DocumentTextIcon, current: false },
  { name: '編集', href: '/team', icon: UsersIcon, current: false },
  { name: 'ユーザー登録', href: '/register', icon: UserPlusIcon, current: false },
]
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Sidebar() {
  const [user,] = useAtom(userAtom)
  const [menuItems, setMenuItems] = useState(navigation.slice(0,3))
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [menu, setMenu] = useState('HOME')
  const handleMenuItemClick = (itemName) =>{
    setMenu(itemName)
  }

  useEffect(() => {
    if (user.is_staff) {
      setMenuItems(navigation)
    } else {
      setMenuItems(navigation.slice(0, 3))
    }
  },[user.is_staff])

  return (
    <>
      <div>
        <div className=" bg-zinc-100 top-16 fixed z-20 flex w-60 h-screen flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col mt-3 overflow-y-auto border-r px-6">
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col">
                <li>
                  <ul role="list" className="-mx-primary-2 space-y-3">
                    {menuItems.map((item) => (
                      <li key={item.name}>
                        <NavLink
                          to={item.href}
                          onClick={()=>handleMenuItemClick(item.name)}
                          className={classNames(
                            item.name === menu
                              ? ' text-primary-2 font-bold'
                              : 'text-gray-700',
                            'group flex  gap-x-3 py-1 rounded-md text-sm leading-6'
                          )}
                        >
                          <item.icon
                            className={classNames(
                              item.name === menu ? 'text-primary-2' : 'text-gray-400 group-hover:text-primary-2',
                              'h-6 w-6 shrink-0'
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </NavLink>
                        <div className='border-[0.5px] border-zinc-400 -mx-6 mt-3'></div>
                      </li>
                    ))}
                  </ul>
                  <NavLink>
                    ログアウト
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  )
}
